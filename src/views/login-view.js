import loginTemplate from './templates/login.html';
class LoginView{
  constructor(c){ this._container=c; }
  render(){ this._container.innerHTML = loginTemplate; }
  getLoginInput(){ return { email:document.querySelector('#login-email').value, password:document.querySelector('#login-password').value }; }
  setOnLoginSubmit(cb){ document.querySelector('#login-form').addEventListener('submit', e=>{ e.preventDefault(); cb(); }); }
  showSuccess(m){ alert(m); location.hash='#/home'; }
  showError(m){ alert(m); }
}
export default LoginView;
