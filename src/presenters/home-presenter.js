import StoryModel from "../models/story-model";
import HomeView from "../views/home-view";
import StoryDB from '../idb';

class HomePresenter {
  constructor(viewContainer) { this._view = new HomeView(viewContainer); }

  async render() {
    const token = StoryModel.getAuthToken();
    if (!token) { this._view.redirectToLogin(); return; }

    this._view.render();

    this._view.setOnStoryItemClick((s) => this._view.focusMapOnStory(s));

    this._view.onSave = async (story) => {
      await StoryDB.put(story);
      alert('Disimpan offline!');
    };
    this._view.onDelete = async (id) => {
      await StoryDB.delete(id);
      alert('Dihapus dari offline!');
    };

    try {
      const stories = await StoryModel.getAllStories();
      this._view.renderStoryList(stories);
      this._view.renderMap(stories);
    } catch (err) {
      const saved = await StoryDB.getAll();
      if (saved.length) {
        this._view.renderStoryList(saved);
        this._view.renderMap(saved);
      } else {
        this._view.showError(`Gagal memuat: ${err.message}`);
      }
      StoryModel.removeAuthToken();
    }
  }
}
export default HomePresenter;
