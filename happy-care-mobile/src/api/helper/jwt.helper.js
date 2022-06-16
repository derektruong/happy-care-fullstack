import { decode } from 'base-64';

class JwtHelper {
  static isTokenExpired(token) {
    return Date.now() >= JSON.parse(decode(token.split('.')[1])).exp * 1000;
  }
}

export default JwtHelper;
