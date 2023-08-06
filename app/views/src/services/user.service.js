import http from '../http-common';

class UserService {
  getPublicContent() {
    return http.get("/all");
  }
  getUserBoard() {
    return http.get("/user");
  }
  getModeratorBoard() {
    return http.get("/mod");
  }
  getAdminBoard() {
    return http.get("/admin");
  }

  async updateUsername(username, userId) {
    return http.post("/user/update/username", { username, userId })
      .then(response => response)
      .catch(err => {
        console.error("[Y]", err.response.data.message || err.message);
        Promise.reject({message: err.message });
      })
  }

  async updateEmail(email, userId) {
    return http.post("/user/update/email", { email, userId })
      .then(response => response)
      .catch(err => {
        console.error("[Y]", err.response.data.message || err.message);
        Promise.reject({message: err.message });
      })
  }

  async updateBiography(biography, userId) {
    return http.post("/user/update/biography", { biography, userId })
      .then(response => response)
      .catch(err => {
        console.error("[Y]", err.response.data.message || err.message);
        Promise.reject({message: err.message });
      })
  }

  async updateFavoriteCategories(favoriteCategories, userId) {
    return http.post("/user/update/favorite-categories", {
      favoriteCategories,
      userId
    })
      .then(response => response)
      .catch(err => {
        console.error("[Y]", err.response?.data?.message || err.message);
        Promise.reject({message: err.message });
      })
  }
}
export default new UserService();