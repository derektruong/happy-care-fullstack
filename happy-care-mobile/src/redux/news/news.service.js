import { Logger, NewsUrl } from '../../api/common';
import HttpService from '../../api/services/http.service';

class NewsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new NewsService();
    }

    return this.instance;
  }

  async getNews({ start, limit }) {
    try {
      const url = `${NewsUrl}`;
      const res = await HttpService.get(url, {
        start,
        limit,
      });

      if (res.success) {
        return res.data;
      }
      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export const newsService = NewsService.getInstance();
