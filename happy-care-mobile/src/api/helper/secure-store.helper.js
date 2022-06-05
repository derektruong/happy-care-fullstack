import * as SecureStore from 'expo-secure-store';
import { JwtToken } from '../common/constants';

class SecureStoreHelper {
  static setAuthBearerToken(token) {
    return SecureStore.setItemAsync(JwtToken, token);
  }

  static getAuthBearerToken() {
    return SecureStore.getItemAsync(JwtToken);
  }

  static deleteAuthBearerToken() {
    return SecureStore.deleteItemAsync(JwtToken);
  }
}

export default SecureStoreHelper;
