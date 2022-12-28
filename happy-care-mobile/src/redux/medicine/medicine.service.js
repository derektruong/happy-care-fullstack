import { Logger, MedicineURL } from '../../api/common';
import HttpService from '../../api/services/http.service';

class MedicineService {
  async getMedicines({ page, limit, sortOption, search }) {
    try {
      const url = `${MedicineURL}/list`;
      const res = await HttpService.get(
        url,
        {
          page,
          limit,
          search,
          sortOption,
        },
        false
      );

      if (res?.statusCode === 200) {
        return res.data;
      }

      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export default new MedicineService();
