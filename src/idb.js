import { openDB } from 'idb';
const DB_NAME = 'story-db';
const STORE = 'stories';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
  }
});

const StoryDB = {
  async getAll() { return (await dbPromise).getAll(STORE); },
  async get(id) { return (await dbPromise).get(STORE, id); },
  async put(story) { return (await dbPromise).put(STORE, story); },
  async delete(id) { return (await dbPromise).delete(STORE, id); },
  async clear() { return (await dbPromise).clear(STORE); }
};
export default StoryDB;
