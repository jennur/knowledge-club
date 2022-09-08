import http from '../http-common';

class AuthService {
  login(user) {
    return http.post("/auth/signin", { 
        username: user.username, 
        password: user.password
      })
      .then(response => {
        console.log("Response:", response.data);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify({
            userId: user.userId,
            username: user.username,
            email: user.email,
            roles: user.roles
        }));
        return user;
      })
      .catch(err => {
        console.log("AuthService login error:", err.response);
        return Promise.reject(err);
      });
  }

  logout() {
    localStorage.removeItem("user");
    return http.get("/auth/logout")
      .then((response => {
        console.log(response.data.message);
        return response;
      }))
      .catch(err => {
        console.log("AuthService logout error:", err.response);
        return Promise.reject(err);
      });
  }

  register(user) {
    return http.post("/auth/signup", { 
      username: user.username,
      password: user.password,
      email: user.email
    })
    .catch(err => {
      console.log("AuthService register error:", err.response);
      return Promise.reject(err);
    });
  }

  getAccessToken() {
    return http.get("/auth/verify-access-token")
      .catch(err => {
        console.log("AuthService get access token error:", err.response);
        return Promise.reject(err);
      })
  }

  checkAdminAccess() {
    return http.get("/auth/verify-admin-access")
      .catch(err => {
        console.log("AuthService verify admin access error:", err.response);
        return Promise.reject(err);
      })
  }
}
export default new AuthService();