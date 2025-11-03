import StoryModel from '../models/story-model';
import RegisterView from '../views/register-view';

class RegisterPresenter {
  constructor(vc){ this._view = new RegisterView(vc); }
  async render(){
    this._view.render();
    this._view.setOnRegisterSubmit(async ()=>{
      try {
        const data = this._view.getRegisterInput();
        await StoryModel.register(data);
        this._view.showSuccess('Registrasi berhasil! Silakan login.');
      } catch(e){ this._view.showError('Registrasi gagal: '+e.message); }
    });
  }
}
export default RegisterPresenter;
