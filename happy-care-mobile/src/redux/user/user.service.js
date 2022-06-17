import { UserUrl } from '../../api/common';
import { uiActions, userActions } from '../actions';
import { httpService } from '../../api/services';

class UserService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }

    return this.instance;
  }

  initUserInfo() {
    return async (dispatch) => {
      try {
        const url = `${UserUrl}/me`;
        const res = await httpService.get(url, null);

        if (res.success) {
          const user = res.data && res.data.user;
          const { role, email, background, profile, specializations } = user;
          dispatch(
            userActions.setUserProfile({
              role,
              email,
              background,
              profile,
              specializations,
            })
          );
        }
      } catch (error) {
        dispatch(
          uiActions.showErrorUI({
            title: 'Error',
            message: error.message,
          })
        );
      }
    };
  }
}

export const userService = UserService.getInstance();
