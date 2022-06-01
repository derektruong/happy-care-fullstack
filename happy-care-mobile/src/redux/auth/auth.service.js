import { UserUrl } from '../../api';
import { uiActions } from '../actions';

export class AuthService {
  static registerNewUser(userCredentials) {
    return async (dispatch) => {
      const sendRequest = async () => {
        const url = `${UserUrl}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        });

        if (response.status !== 200) {
          throw new Error('Register new user to server failed');
        }
      };

      try {
        await sendRequest();

        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Register success',
            message: 'Register new user successfully!',
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error',
            message: error.message,
          })
        );
      }
    };
  }
}
