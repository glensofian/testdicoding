import homeTemplate from './templates/home.html';

class HomeView {
  constructor(container){
    this._container = container;
    this._map = null;
    this._markers = {};
    this.onSave = null;
    this.onDelete = null;
  }

  render(){ this._container.innerHTML = homeTemplate; }

  renderStoryList(stories){
    const container = document.querySelector('#story-list');
    container.innerHTML = '';
    stories.forEach(story=>{
      const el = document.createElement('div');
      el.className = 'story-item';
      if (story.lat && story.lon){
        el.dataset.id = story.id; el.dataset.lat = story.lat; el.dataset.lon = story.lon;
        el.classList.add('story-item--clickable');
      }
      el.innerHTML = `
        <img src="${story.photoUrl}" alt="Foto ${story.name}">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <small>${new Date(story.createdAt).toLocaleString()}</small>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="save-btn" data-id="${story.id}">Simpan</button>
          <button class="del-btn secondary" data-id="${story.id}">Hapus</button>
        </div>
      `;
      container.appendChild(el);
    });

    container.querySelectorAll('.save-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.id;
        const story = stories.find(s=>s.id===id);
        this.onSave?.(story);
      });
    });
    container.querySelectorAll('.del-btn').forEach(btn=>{
      btn.addEventListener('click', ()=> this.onDelete?.(btn.dataset.id));
    });
  }

  renderMap(stories){
    const withLoc = stories.filter(s=>s.lat && s.lon);
    const mapContainer = document.querySelector('#stories-map');
    if (!withLoc.length){ mapContainer.innerHTML = '<p>Tidak ada lokasi.</p>'; return; }

    this._map = L.map('stories-map').setView([withLoc[0].lat, withLoc[0].lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'&copy; OpenStreetMap' }).addTo(this._map);

    withLoc.forEach(story=>{
      const m = L.marker([story.lat, story.lon]).addTo(this._map);
      m.bindPopup(`<div class="popup-content">
        <img src="${story.photoUrl}" style="width:100%;border-radius:4px" alt="${story.name}">
        <b>${story.name}</b><p>${story.description.substring(0,60)}...</p>
      </div>`);
      this._markers[story.id] = m;
    });
  }

  setOnStoryItemClick(callback){
    document.querySelector('#story-list').addEventListener('click', e=>{
      const item = e.target.closest('.story-item--clickable');
      if (item){ const {lat,lon,id} = item.dataset; callback({lat,lon,id}); }
    });
  }

  focusMapOnStory({lat,lon,id}){ if (this._map && this._markers[id]){ this._map.flyTo([lat,lon], 15); this._markers[id].openPopup(); } }

  showError(msg){ document.querySelector('#story-list').innerHTML = `<p>${msg}</p>`; }
  redirectToLogin(){ location.hash = '#/login'; }
}
export default HomeView;
