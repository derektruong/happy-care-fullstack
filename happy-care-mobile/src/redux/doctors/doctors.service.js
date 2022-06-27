import { Logger, UserUrl, UserDefaultProfile } from '../../api/common';
import { httpService } from '../../api/services';

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
        return doctors.map((doctor) => ({
          id: doctor._id,
          fullname: doctor?.profile?.fullname || UserDefaultProfile.fullname,
          avatar: doctor?.profile?.avatar || UserDefaultProfile.doctorAvatar,
          specializations: doctor?.specializations || [],
        }));
      }
    } catch (error) {
      Logger.Error(error.message);
    }
    return [];
  }
}
export const doctorsService = DoctorsService.getInstance();
