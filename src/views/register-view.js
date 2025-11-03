import registerTemplate from './templates/register.html';
class RegisterView{
  constructor(c){ this._container=c; }
  render(){ this._container.innerHTML = registerTemplate; }
  getRegisterInput(){ return { name:document.querySelector('#register-name').value, email:document.querySelector('#register-email').value, password:document.querySelector('#register-password').value }; }
  setOnRegisterSubmit(cb){ document.querySelector('#register-form').addEventListener('submit', e=>{ e.preventDefault(); cb(); }); }
  showSuccess(m){ alert(m); location.hash='#/login'; }
  showError(m){ alert(m); }
}
export default RegisterView;
