import { Logger, AdminUrl, UserUrl } from '../../api/common';
import store from '../store';
import { specActions } from '../actions';
import HttpService from '../../api/services/http.service';

class SpecService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SpecService();
    }

    return this.instance;
  }

  async getAllSpecs() {
    try {
      const url = `${AdminUrl}/specialization`;
      const res = await HttpService.get(url, null);
      if (res.success) {
        const specs = res.data.specializations.map((spec) => ({
          id: spec._id,
          name: spec.name,
          description: spec.description,
          keywords: spec.keywords,
        }));
        store.dispatch(specActions.setSpecs({ specs }));
      }
    } catch (error) {
      Logger.Error(error.message);
    }
  }

  async getSpecsBySymptomKeyword(listSymptomIds) {
    try {
      const [id1, id2, id3] = listSymptomIds;
      const params = {
        keys: `${id1}${id2 ? `,${id2}` : ''}${id3 ? `,${id3}` : ''}`,
      };
      const url = `${UserUrl}/specialization/symptom-keyword`;
      const res = await HttpService.get(url, params);

      if (res.success) {
        const specs = res.data.specializations.map((spec) => ({
          id: spec._id,
          name: spec.name,
          description: spec.description,
          keywords: spec.keywords,
        }));

        store.dispatch(specActions.setSpecs({ specs }));
      }
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export const specService = SpecService.getInstance();
