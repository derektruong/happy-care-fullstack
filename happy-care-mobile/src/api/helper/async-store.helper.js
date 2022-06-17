import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '../common';

class AsyncStoreHelper {
  static setUserId(userId) {
    return AsyncStorage.setItem(AsyncStorageKey.UserId, userId);
  }

  static getUserId() {
    return AsyncStorage.getItem(AsyncStorageKey.UserId);
  }

  static removeUserId() {
    return AsyncStorage.removeItem(AsyncStorageKey.UserId);
  }
}

export default AsyncStoreHelper;
