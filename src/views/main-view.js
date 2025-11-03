import '../styles/main.css';
import Router from '../utils/router';
import HomePresenter from '../presenters/home-presenter';
import LoginPresenter from '../presenters/login-presenter';
import RegisterPresenter from '../presenters/register-presenter';
import AddStoryPresenter from '../presenters/add-story-presenter';
import SavedPresenter from '../presenters/saved-presenter';

const routes = {
  '/': HomePresenter,
  '/home': HomePresenter,
  '/login': LoginPresenter,
  '/register': RegisterPresenter,
  '/add-story': AddStoryPresenter,
  '/saved': SavedPresenter
};

const router = new Router(document.querySelector('#main-content'), routes);

function updateNavbar(){
  const token = localStorage.getItem('authToken');
  const loginLink = document.getElementById('nav-login');
  const logoutBtn = document.getElementById('logout-btn');
  if (token){ loginLink.style.display='none'; logoutBtn.style.display='inline-block'; }
  else { loginLink.style.display='inline-block'; logoutBtn.style.display='none'; }
}

document.addEventListener('click', e=>{
  if (e.target && e.target.id==='logout-btn'){
    localStorage.removeItem('authToken');
    location.hash = '#/login';
    updateNavbar();
  }
});

let deferredPrompt;
const installBtn = document.getElementById('install-btn');
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault(); deferredPrompt = e;
  installBtn.style.display='inline-block';
});
installBtn?.addEventListener('click', async ()=>{
  installBtn.style.display='none';
  if (deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
});

window.addEventListener('hashchange', ()=>{ router.renderPage(); updateNavbar(); });
window.addEventListener('load', ()=>{
  router.renderPage(); updateNavbar();
  if ('Notification' in window && Notification.permission==='default'){
    Notification.requestPermission().catch(()=>{});
  }
});
