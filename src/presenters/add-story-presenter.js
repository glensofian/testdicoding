import StoryModel from '../models/story-model';
import AddStoryView from '../views/add-story-view';

class AddStoryPresenter {
  constructor(viewContainer) { this._view = new AddStoryView(viewContainer); }
  async render() {
    this._view.render();
    this._view.setOnSubmit(async () => {
      const formData = this._view.getStoryInput();
      if (!formData) return;
      try {
        await StoryModel.addNewStory(formData);
        this._view.showSuccess('Cerita berhasil diunggah!');
      } catch (e) {
        this._view.showError('Gagal unggah: ' + e.message);
      }
    });
  }
}
export default AddStoryPresenter;
