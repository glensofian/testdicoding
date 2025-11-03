import homeTemplate from './templates/home.html';

class HomeView {
  constructor(container) {
    this._container = container;
    this._map = null;
    this._markers = {};
    this._onSaveClick = null;
  }

  render() {
    this._container.innerHTML = homeTemplate;
  }

  renderStoryList(stories) {
    const container = document.querySelector('#story-list');
    container.innerHTML = '';

    stories.forEach((story) => {
      const storyItem = document.createElement('div');
      storyItem.classList.add('story-item');

      if (story.lat && story.lon) {
        storyItem.dataset.id = story.id;
        storyItem.dataset.lat = story.lat;
        storyItem.dataset.lon = story.lon;
        storyItem.classList.add('story-item--clickable');
      }

      storyItem.innerHTML = `
        <img src="${story.photoUrl}" alt="Foto cerita dari ${story.name}">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <small>Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}</small>
        <button class="save-story-btn" data-id="${story.id}">Simpan Offline</button>
      `;
      container.appendChild(storyItem);
    });

    if (this._onSaveClick) {
      document.querySelectorAll('.save-story-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const story = stories.find((s) => s.id === id);
          if (story) this._onSaveClick(story);
        });
      });
    }
  }

  renderMap(stories) {
    const storiesWithLocation = stories.filter((s) => s.lat && s.lon);
    const mapContainer = document.querySelector('#stories-map');

    if (storiesWithLocation.length === 0) {
      mapContainer.innerHTML = '<p>Tidak ada cerita dengan data lokasi untuk ditampilkan di peta.</p>';
      return;
    }

    this._map = L.map('stories-map').setView([storiesWithLocation[0].lat, storiesWithLocation[0].lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this._map);

    storiesWithLocation.forEach((story) => {
      const marker = L.marker([story.lat, story.lon]).addTo(this._map);
      marker.bindPopup(`
        <div class="popup-content">
          <img src="${story.photoUrl}" alt="${story.name}" style="width:100%; border-radius:4px;">
          <b>${story.name}</b>
          <p>${story.description.substring(0, 50)}...</p>
        </div>
      `);
      this._markers[story.id] = marker;
    });
  }

  setOnStoryItemClick(callback) {
    document.querySelector('#story-list').addEventListener('click', (event) => {
      const storyItem = event.target.closest('.story-item--clickable');
      if (storyItem) {
        const { lat, lon, id } = storyItem.dataset;
        callback({ lat, lon, id });
      }
    });
  }

  setOnSaveClick(callback) {
    this._onSaveClick = callback;
  }

  focusMapOnStory({ lat, lon, id }) {
    if (this._map && this._markers[id]) {
      this._map.flyTo([lat, lon], 15);
      this._markers[id].openPopup();
    }
  }

  showError(message) {
    document.querySelector('#story-list').innerHTML = `<p>${message}</p>`;
  }

  redirectToLogin() {
    window.location.hash = '#/login';
  }
}

export default HomeView;
