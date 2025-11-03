import savedTemplate from './templates/saved.html';

class SavedView {
  constructor(c){ this._container=c; this.onDelete=null; this.onClear=null; }
  render(){ this._container.innerHTML = savedTemplate; }

  renderSaved(stories){
    const wrap = document.getElementById('saved-list');
    wrap.innerHTML = stories.length ? '' : '<p>Belum ada data offline.</p>';
    stories.forEach(story=>{
      const el = document.createElement('div');
      el.className = 'story-item';
      el.dataset.id = story.id;
      el.innerHTML = `
        <img src="${story.photoUrl}" alt="${story.name}">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <button class="del-saved secondary" data-id="${story.id}">Hapus</button>
      `;
      wrap.appendChild(el);
    });
    wrap.querySelectorAll('.del-saved').forEach(btn=>{
      btn.addEventListener('click', ()=> this.onDelete?.(btn.dataset.id));
    });
    document.getElementById('clear-all')?.addEventListener('click', ()=> this.onClear?.());
  }

  removeCard(id){ this._container.querySelector(`[data-id="${id}"]`)?.remove(); }
  clearAll(){ document.getElementById('saved-list').innerHTML = '<p>Belum ada data offline.</p>'; }
}
export default SavedView;
