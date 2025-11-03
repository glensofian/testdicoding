import StoryModel from "../models/story-model";
import HomeView from "../views/home-view";
import StoryDB from '../idb.js';

class HomePresenter {
  constructor(viewContainer) {
    this._view = new HomeView(viewContainer);
  }

  async render() {
    const token = StoryModel.getAuthToken();
    if (!token) {
      this._view.redirectToLogin();
      return;
    }

    this._view.render();

    this._view.setOnStoryItemClick((story) => {
      this._view.focusMapOnStory(story);
    });

    this._view.setOnSaveClick(async (story) => {
      try {
        await StoryDB.put(story);
        alert('Cerita disimpan ke offline!');
      } catch (e) {
        alert('Gagal menyimpan offline: ' + e.message);
      }
    });

    try {
      const stories = await StoryModel.getAllStories();
      this._view.renderStoryList(stories);
      this._view.renderMap(stories);
    } catch (error) {
      const offlineStories = await StoryDB.getAll();
      if (offlineStories.length > 0) {
        this._view.renderStoryList(offlineStories);
        this._view.renderMap(offlineStories);
      } else {
        this._view.showError(
          `Gagal memuat cerita: ${error.message}. Tidak ada data offline.`
        );
      }
      StoryModel.removeAuthToken();
    }
  }
}

export default HomePresenter;
