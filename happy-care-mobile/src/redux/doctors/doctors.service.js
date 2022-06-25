import { Logger, UserUrl } from '../../api/common';
import { httpService } from '../../api/services';
import store from '../store';
import { doctorsAction } from './doctors.slice';

class DoctorsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new DoctorsService();
    }
    return this.instance;
  }

  async getDoctorsBySpec(specId) {
    try {
      const url = `${UserUrl}/get-doctors`;
      const params = { specId };
      const res = await httpService.get(url, params);
      if (res.success) {
        const { doctors } = res.data;
        store.dispatch(
          doctorsAction.setDoctors({
            doctors,
          })
        );
      }
      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}
export const doctorsService = DoctorsService.getInstance();
