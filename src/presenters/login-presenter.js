import StoryModel from '../models/story-model';
import LoginView from '../views/login-view';

class LoginPresenter {
  constructor(vc){ this._view = new LoginView(vc); }
  async render(){
    this._view.render();
    this._view.setOnLoginSubmit(async ()=>{
      try {
        const {email,password}=this._view.getLoginInput();
        await StoryModel.login({email,password});
        this._view.showSuccess('Login berhasil!');
      } catch(e){ this._view.showError('Login gagal: '+e.message); }
    });
  }
}
export default LoginPresenter;
