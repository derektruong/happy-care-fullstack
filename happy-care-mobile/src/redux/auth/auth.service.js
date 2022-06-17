import { UserUrl, Role, ScreenName } from '../../api/common';
import { SecureStoreHelper, AsyncStoreHelper } from '../../api/helper';
import { authActions, uiActions } from '../actions';
import { httpService, socketService } from '../../api/services';

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
          await SecureStoreHelper.setAuthBearerToken(token);
          socketService.emitJoinApp({ token });

          dispatch(uiActions.navigateScreen(ScreenName.bottomTab));
          dispatch(
            uiActions.showSuccessUI({
              title: 'Login success',
              message: 'Đăng nhập thành công',
              position: 'top',
            })
          );

          const user = res.data && res.data.user;
          if (user && user._id) {
            AsyncStoreHelper.setUserId(user._id);
          }
        } else {
          dispatch(
            uiActions.showErrorUI({
              title: 'Error',
              message: res.message,
              position: 'bottom',
            })
          );
        }
      } catch (error) {
        dispatch(
          uiActions.showErrorUI({
            title: 'Error',
            message: error.message,
            position: 'bottom',
          })
        );
      }
    };
  }

  logout() {
    return async (dispatch) => {
      try {
        SecureStoreHelper.deleteAuthBearerToken();

        socketService.emitDisconnect();

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
            position: 'bottom',
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showErrorUI({
            title: 'Error',
            message: error.message,
            position: 'bottom',
          })
        );
      }
    };
  }
}

export const authService = AuthService.getInstance();
