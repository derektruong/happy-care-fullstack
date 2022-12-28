import { Logger, SymptomsURL } from '../../api/common';
import HttpService from '../../api/services/http.service';
import store from '../store';
import { symptomsAction } from './symptoms.slice';

class SymptomsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SymptomsService();
    }
    return this.instance;
  }

  async getSymptoms() {
    try {
      const url = `${SymptomsURL}`;
      const params = null;
      const res = await HttpService.get(url, params);
      if (res.success) {
        const symptoms = res.data.keywords;
        store.dispatch(
          symptomsAction.setSymptoms({
            symptoms,
          })
        );
      }
      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export const symptomsService = SymptomsService.getInstance();
