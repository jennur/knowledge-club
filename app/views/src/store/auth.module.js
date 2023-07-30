import AuthService from '../services/auth.service';
import { userModel } from "../models/user";
import router from "../router";
import store from '.';
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
          const userObj = JSON.stringify(userModel(user));
          localStorage.setItem("user", userObj);
          commit('loginSuccess', user);
          return user;
        },
        err => {
          commit('loginFailure');
          return Promise.reject(err);
        }
      );
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
          }
        );
    },
    checkAccessToken({ commit }) {
      return AuthService.getAccessToken().then(
        response => {
          console.log("[Y]", response.data.message);
          if(!store.state.auth.user) {
            commit("loginSuccess", response.data.user);
          }
          return Promise.resolve(response.data);
        },
        err => {
          console.log("CheckAccessToken error:", err);
          localStorage.removeItem("user");
          commit('logout');
          router.push({ name: "home" });
          return Promise.reject(err)
        }
      );
    },
    checkAdminAccess({ commit }) {
      return AuthService.checkAdminAccess().then(
        response => {
          console.log("[Y]", response.data.message);
          return Promise.resolve(response.data);
        },
        err => {
          console.log("CheckAdminAccess error:", err);
          return Promise.reject(err)
        }
      )
    }
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
    }
  }
};