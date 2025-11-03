const API_ENDPOINT = 'https://story-api.dicoding.dev/v1';

class StoryApi {
  static async getAllStories(token) {
    const res = await fetch(`${API_ENDPOINT}/stories`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (json.error) throw new Error(json.message);
    return json.listStory;
  }

  static async register(data) {
    const res = await fetch(`${API_ENDPOINT}/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.error) throw new Error(json.message);
    return json;
  }

  static async login(data) {
    const res = await fetch(`${API_ENDPOINT}/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.error) throw new Error(json.message);
    return json.loginResult;
  }

  static async addNewStory(formData) {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('User not authenticated');
    const res = await fetch(`${API_ENDPOINT}/stories`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const json = await res.json();
    if (json.error) throw new Error(json.message);
    return json;
  }

  static setAuthToken(token) { localStorage.setItem('authToken', token); }
  static getAuthToken() { return localStorage.getItem('authToken'); }
  static removeAuthToken() { localStorage.removeItem('authToken'); }
}
export default StoryApi;
