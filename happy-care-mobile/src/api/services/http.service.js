import SecureStoreHelper from '../helper/secure-store.helper';

class HttpService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpService();
    }

    return this.instance;
  }

  initBasicHeader() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  initAuthHeader() {
    const token = SecureStoreHelper.getAuthBearerToken();

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async get(url, params, isAuthorized = true) {
    const headers = isAuthorized ? this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(`${url}?${convertParams(params)}`, {
      headers,
      credentials: 'include',
      method: 'GET',
    });

    return response.json();
  }

  async post(url, body, isAuthorized = true) {
    const headers = isAuthorized ? this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(url, {
      headers,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async put(url, body, isAuthorized = true) {
    const headers = isAuthorized ? this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(url, {
      headers,
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async delete(url, isAuthorized = true) {
    const headers = isAuthorized ? this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(url, {
      headers,
      credentials: 'include',
      method: 'DELETE',
    });

    return response.json();
  }
}

export const httpService = HttpService.getInstance();

function convertParams(params) {
  if (!params) {
    return '';
  }

  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
}
