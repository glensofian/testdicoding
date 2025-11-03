import addStoryTemplate from './templates/add-story.html';

class AddStoryView {
  constructor(container){
    this._container = container;
    this._stream = null;
    this._photo = null;
    this._latitude = null;
    this._longitude = null;
  }
  render(){ this._container.innerHTML = addStoryTemplate; this._initCamera(); this._initMap(); }

  async _initCamera(){
    const video = document.querySelector('#camera-feed');
    try{
      this._stream = await navigator.mediaDevices.getUserMedia({ video:true });
      video.srcObject = this._stream;
    }catch(_){ this.showError('Tidak bisa akses kamera.'); }
  }

  _initMap(){
    const map = L.map('map').setView([-6.2,106.816666], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'&copy; OpenStreetMap' }).addTo(map);
    const marker = L.marker([-6.2,106.816666]).addTo(map);
    map.on('click', e=>{
      const {lat,lng} = e.latlng; this._latitude = lat; this._longitude = lng;
      marker.setLatLng(e.latlng);
      document.querySelector('#story-location').value = `Lat: ${lat.toFixed(6)}, Lon: ${lng.toFixed(6)}`;
    });
  }

  _capturePhoto(){
    const video = document.querySelector('#camera-feed');
    const canvas = document.querySelector('#photo-canvas');
    const preview = document.querySelector('#photo-preview');
    const ctx = canvas.getContext('2d');
    if (!video.videoWidth) return this.showError('Kamera belum siap.');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    canvas.toBlob(b => { this._photo = b; }, 'image/jpeg');
    preview.src = canvas.toDataURL('image/jpeg'); preview.classList.remove('hidden'); video.classList.add('hidden');
    this._stream?.getTracks().forEach(t=>t.stop());
  }

  getStoryInput(){
    const desc = document.querySelector('#story-description').value.trim();
    const fileInput = document.querySelector('#story-photo');
    let photo = this._photo;
    if (fileInput.files?.length) photo = fileInput.files[0];
    if (!photo || !desc){ this.showError('Deskripsi & Foto wajib.'); return null; }
    const fd = new FormData();
    fd.append('photo', photo); fd.append('description', desc);
    if (this._latitude && this._longitude){ fd.append('lat', this._latitude); fd.append('lon', this._longitude); }
    return fd;
  }

  setOnSubmit(cb){
    document.querySelector('#capture-button').addEventListener('click', ()=> this._capturePhoto());
    document.querySelector('#add-story-form').addEventListener('submit', e=>{ e.preventDefault(); cb(); });
  }

  showSuccess(msg){ alert(msg); location.hash = '#/home'; }
  showError(msg){ alert(msg); }
}
export default AddStoryView;
