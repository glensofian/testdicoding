import SavedView from '../views/saved-view';
import StoryDB from '../idb';

class SavedPresenter {
  constructor(vc){ this._view = new SavedView(vc); }
  async render(){
    this._view.render();
    const stories = await StoryDB.getAll();
    this._view.renderSaved(stories);

    this._view.onDelete = async (id) => {
      await StoryDB.delete(id);
      this._view.removeCard(id);
    };
    this._view.onClear = async () => {
      await StoryDB.clear();
      this._view.clearAll();
    };
  }
}
export default SavedPresenter;
