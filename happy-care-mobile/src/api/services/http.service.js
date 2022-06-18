import SecureStoreHelper from '../helper/secure-store.helper';
import { Logger } from '../common';

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

  async initAuthHeader() {
    const token = await SecureStoreHelper.getAuthBearerToken();

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async get(url, params, isAuthorized = true) {
    const headers = isAuthorized ? await this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(`${url}?${convertParams(params)}`, {
      headers,
      credentials: 'include',
      method: 'GET',
    });

    return response.json();
  }

  async post(url, body, isAuthorized = true) {
    try {
      const headers = isAuthorized ? await this.initAuthHeader() : this.initBasicHeader();
      const isFormDataBody = !!(body instanceof FormData);

      if (isFormDataBody) {
        headers['Content-Type'] = 'multipart/form-data';
      }

      const response = await fetch(url, {
        headers,
        credentials: 'include',
        method: 'POST',
        body: isFormDataBody ? body : JSON.stringify(body),
      });

      return response.json();
    } catch (error) {
      Logger.Error(error.message);
    }
  }

  async patch(url, body, isAuthorized = true) {
    const headers = isAuthorized ? await this.initAuthHeader() : this.initBasicHeader();

    const response = await fetch(url, {
      headers,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async delete(url, isAuthorized = true) {
    const headers = isAuthorized ? await this.initAuthHeader() : this.initBasicHeader();

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
