import BaseService from '@/helpers/BaseService';
import { STORE_AUTH_TOKEN, STORE_AUTH_USER } from '@/constants/StoreKey';
import Logger from '@/helpers/Logger';
import AsyncStorage from '@react-native-community/async-storage';

class AccountService extends BaseService {
  user;
  token = '';

  get loggedIn() {
    return !!(this.token && this.user);
  }

  async getSavedLogin() {
    try {
      const [token, user] = await Promise.all([
        AsyncStorage.getItem(STORE_AUTH_TOKEN),
        AsyncStorage.getItem(STORE_AUTH_USER),
      ]);
      this.token = token;
      this.user = JSON.parse(user);
    } catch (error) {
      Logger.warning('getSavedLogin ERROR', error);
    }
  }

  async logout() {
    this.token = '';
    this.user = null;
    await AsyncStorage.multiRemove([STORE_AUTH_TOKEN, STORE_AUTH_USER]);
    return true;
  }

  async login() {
    this.token = 'abc';
    this.user = {
      username: 'longnd',
      profile: {
        name: 'Long',
      },
    };
    await this.saveLogin();
  }

  async saveLogin() {
    await Promise.all([
      AsyncStorage.setItem(STORE_AUTH_TOKEN, JSON.stringify(this.token)),
      AsyncStorage.setItem(STORE_AUTH_USER, JSON.stringify(this.user)),
    ]);
    return true;
  }

  async initService() {
    await this.getSavedLogin();
    this.serviceInited = true;
  }
}

export default new AccountService();
