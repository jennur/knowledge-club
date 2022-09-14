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
          return Promise.resolve(user);
        },
        error => {
          console.log("Failure login:", error);
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      router.push({ name: "home" });
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
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
        error => {
          console.log("CheckAccessToken error:", error);
          localStorage.removeItem("user");
          commit('logout');
          router.push({ name: "home" });
          return Promise.reject(error)
        }
      );
    },
    checkAdminAccess({ commit }) {
      return AuthService.checkAdminAccess().then(
        response => {
          console.log("[Y]", response.data.message);
          return Promise.resolve(response.data);
        },
        error => {
          console.log("CheckAdminAccess error:", error);
          return Promise.reject(error)
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