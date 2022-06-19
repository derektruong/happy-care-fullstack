import { Logger, AdminUrl } from '../../api/common';
import store from '../store';
import { specActions } from '../actions';
import { httpService } from '../../api/services';

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
      const res = await httpService.get(url, null);
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
