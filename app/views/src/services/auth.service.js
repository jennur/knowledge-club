import http from '../http-common';

class AuthService {
  login(user) {
    return http.post("/auth/signin", { 
        username: user.username, 
        password: user.password
      })
      .then(response => {
        console.log("User", response.data);
        const user = response.data;
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
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
}
export default new AuthService();