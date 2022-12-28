import _ from 'lodash';
import { Logger, UserDefaultProfile, UserUrl } from '../../api/common';
import store from '../store';
import { roleActions, uiActions, userActions } from '../actions';
import HttpService from '../../api/services/http.service';
import CloudinaryService from '../../api/services/cloudinary.service';

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
        const res = await HttpService.get(url, null);

        if (res.success) {
          const user = res.data && res.data.user;
          const { _id, role, email, background, profile, specializations } = user;
          dispatch(
            userActions.setUserInfo({
              role,
              email,
              background,
              profile,
              specializations,
              id: _id,
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
        const avatarUrl = await CloudinaryService.uploadImage(userInfo.avatar);
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
        const res = await HttpService.patch(url, updateData);

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

  async getDoctors(specId = null) {
    try {
      const url = `${UserUrl}/get-doctors`;
      const params = specId || null;
      const res = await HttpService.get(url, params);
      if (res.success) {
        const { doctors } = res.data;
        store.dispatch(
          roleActions.setDoctors({
            doctors: doctors.map((dt) => ({
              id: _.get(dt, '_id', ''),
              fullname: _.get(dt, 'profile.fullname', ''),
              specializations: _.get(dt, 'specializations', []),
              avatar: _.get(dt, 'profile.avatar', UserDefaultProfile.doctorAvatar),
              email: _.get(dt, 'email', ''),
            })),
          })
        );
      }
      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export const userService = UserService.getInstance();
