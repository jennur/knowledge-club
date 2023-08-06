import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { userModel } from "../models/user";
import router from "../router";
import store from '.';

function saveUserToLocalStorage(user) {
  const userObj = JSON.stringify(userModel(user));
  localStorage.setItem("user", userObj);
}
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          const { favoriteCategories } = user;
          if(favoriteCategories) {
            user.favoriteCategories = JSON.parse(favoriteCategories);
          }
          saveUserToLocalStorage(user);
          user = userModel(user);
          commit('loginSuccess', user);
          return user;
        },
        err => {
          commit('loginFailure');
          return Promise.reject(err);
        });
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      router.push({ name: "home" });
    },
    register({ commit }, user) {
      return AuthService.register(user)
        .then(
          response => {
            commit('registerSuccess');
            return response.data
          },
          err => {
            commit('registerFailure');
            return Promise.reject(err);
          });
    },
    checkAccessToken({ commit }) {
      return AuthService.getAccessToken().then(
        response => {
          if(!store.state.auth.user) {
            commit("loginSuccess", response.data.user);
          }
          return Promise.resolve(response.data);
        },
        err => {
          localStorage.removeItem("user");
          commit('logout');
          router.push({ name: "home" });
          return Promise.reject(err)
        });
    },
    checkAdminAccess() {
      return AuthService.checkAdminAccess().then(
        response => {
          return Promise.resolve(response.data);
        },
        err => {
          return Promise.reject(err)
        });
    },
    updateUsername({ commit }, { username, userId }) {
      return UserService.updateUsername(username, userId)
        .then(response => {
          commit("setUsername", response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    updateBiography({ commit }, { biography, userId }) {
      return UserService.updateBiography(biography, userId)
        .then(response => {
          commit("setBiography", response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    updateFavoriteCategories({ commit }, { categories, userId }) {
      return UserService.updateFavoriteCategories(categories, userId)
        .then(response => {
          commit("setFavoriteCategories", response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    setUsername(state, username) {
      user.username = username;
      saveUserToLocalStorage(user);
      state.user.username = username;
    },
    setEmail(state, email) {
      user.email = email;
      saveUserToLocalStorage(email);
      state.user.email = email;
    },
    setBiography(state, biography) {
      user.biography = biography;
      saveUserToLocalStorage(user);
      state.user.biography = biography;
    },
    setFavoriteCategories(state, favoriteCategories) {
      user.favoriteCategories = favoriteCategories;
      saveUserToLocalStorage(user);
      state.user.favoriteCategories = favoriteCategories;
    }
  }
};