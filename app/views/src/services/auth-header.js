export default function authHeader() {
    let accessToken = document.cookie.token;
    if (accessToken) {
      return { Authorization: 'Bearer ' + accessToken };
    } else {
      return {};
    }
  }