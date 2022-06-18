import { UserUrl } from '../../api/common';
import store from '../store';
import { uiActions, userActions } from '../actions';
import { httpService, cloudinaryService } from '../../api/services';

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
            userActions.setUserInfo({
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

  updateUserInfo(userInfo) {
    return async (dispatch) => {
      const state = store.getState();
      if (userInfo.avatar && userInfo.avatar !== state.user.profile.avatar) {
        const avatarUrl = await cloudinaryService.uploadImage(userInfo.avatar);
        userInfo.avatar = avatarUrl;
      }

      const updateData = {
        profile: {
          fullname: userInfo.fullname || null,
          avatar: userInfo.avatar || null,
          phone: userInfo.phone || null,
          address: userInfo.address || null,
          age: userInfo.age || null,
        },
      };

      try {
        const url = `${UserUrl}/me`;
        const res = await httpService.patch(url, updateData);

        if (res.success) {
          dispatch(userActions.setUserProfile(updateData));
          dispatch(
            uiActions.showSuccessUI({
              title: 'Update successfully',
              message: 'Cập nhật thông tin thành công',
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
