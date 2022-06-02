import { UserUrl, Role, ScreenName } from '../../api/common';
import SecureStoreHelper from '../../api/helper/secure-store.helper';
import { authActions, uiActions } from '../actions';
import { httpService } from '../../api/services/http.service';

class AuthService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  registerNewUser(userCredentials) {
    const { email, password } = userCredentials;

    const data = {
      email,
      password,
      role: Role.member,
    };

    return async (dispatch) => {
      try {
        const url = `${UserUrl}`;
        const res = await httpService.post(url, data, false);

        if (res.success === true) {
          dispatch(uiActions.navigateScreen(ScreenName.login));
          dispatch(
            uiActions.showSuccessUI({
              title: 'Register success',
              message: 'Đăng ký thành công, bạn hãy đăng nhập để sử dụng ứng dụng nhé',
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

  login(userCredentials) {
    const { email, password } = userCredentials;
    const data = { email, password };

    return async (dispatch) => {
      try {
        const url = `${UserUrl}/login`;
        const res = await httpService.post(url, data, false);

        if (res.success === true) {
          const token = res.data && res.data.token;
          SecureStoreHelper.setAuthBearerToken(token);
          dispatch(uiActions.navigateScreen(ScreenName.bottomTab));
          dispatch(
            uiActions.showSuccessUI({
              title: 'Login success',
              message: 'Đăng nhập thành công',
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

  logout() {
    return async (dispatch) => {
      try {
        SecureStoreHelper.deleteAuthBearerToken();
        dispatch(
          authActions.setLogout({
            registerCredentials: {},
            loginCredentials: {},
            isLoggedIn: false,
          })
        );
        dispatch(uiActions.navigateScreen(ScreenName.login));
        dispatch(
          uiActions.showSuccessUI({
            title: 'Logout success',
            message: 'Đăng xuất thành công',
          })
        );
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

export const authService = AuthService.getInstance();
