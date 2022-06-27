import _ from 'lodash';
import { Logger, NewsUrl } from '../../api/common';
import { httpService } from '../../api/services';
import { roleActions } from '../actions';
import store from '../store';
import { newActions } from './news.slice';

class NewsService {
    static getInstance() {
        if (!this.instance) {
            this.instance = new NewsService();
        }

        return this.instance;
    }

    async getNews(page) {
        try {
            const url = `${NewsUrl}`
            const res = await httpService.get(url, {
                start: page * 10,
                limit: 10,
            });

            if (res.success) {
                store.dispatch(
                    newActions.setNews({
                        news: res.data,
                    })
                );
            }
            return [];
        } catch (error) {
            Logger.Error(error.message);
        }
    }
}

export const newsService = NewsService.getInstance();