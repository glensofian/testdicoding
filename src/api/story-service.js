const API_ENDPOINT = 'https://story-api.dicoding.dev/v1';

class StoryApi {
  // Catatan: perlu token.
  // handle login.
  static async getAllStories(token) {
    const response = await fetch(`${API_ENDPOINT}/stories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson.listStory;
  }

  static async register(data) {
    const response = await fetch(`${API_ENDPOINT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  }

  static async login(data) {
    const response = await fetch(`${API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson.loginResult;
  }

  static async addNewStory(formData) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_ENDPOINT}/stories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  }

  static setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  static removeAuthToken() {
    localStorage.removeItem('authToken');
  }
}

export default StoryApi;