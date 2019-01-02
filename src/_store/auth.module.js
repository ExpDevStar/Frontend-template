import Vue from "vue";
import ApiService from "@/api";
import JwtService from "@/_services/jwt.service";
import { UserService } from "@/_services/user.service";


import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const initialState = {
  namespaced: true,
  errors: [],
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  status: '',
};

const state = { ...initialState };

const getters = {
  currentUser(state) {
    return state.user;
  },
  registeringStatus(state) {
    return state.status
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  errors(state) {
    state.errors
  }
};

const actions = {
  resetState(context) {
    context.commit('resetState')
  },
  checkAuth(context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    }
    else {
      context.commit(PURGE_AUTH);
    }
  },
  login(context, { email, password }) {
    context.commit('setStatus', 'loggingin')
    context.commit(SET_ERROR, []);
    return new Promise(resolve => {
      ApiService.post("auth/login", { email, password })
        .then(response => {
          context.commit('setStatus', '')
          context.commit(SET_ERROR, []);
          context.commit(SET_AUTH, JSON.stringify(response.data));
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit('setStatus', 'fail')
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  register(context, { email, password, passwordConfirm, firstName, lastName, organizationName }) {
    context.commit('setStatus', 'registering')
    return new Promise((resolve, reject) => {
      ApiService.post("auth/register", { email, password, passwordConfirm, firstName, lastName, organizationName }).then(response => {
        context.commit('setStatus', '')
        context.commit(SET_AUTH, JSON.stringify(response.data));
        resolve(response);
      }).catch(({ response }) => {
        context.commit('setStatus', 'fail')
        reject(response);
      });
    });
  },
  logout(context) {
    context.commit('resetState')
  },
  forgotPWRequest({ dispatch, commit }, { email }) {
    commit('forgotPWRequest')

    UserService.forgotPWRequest(email).then(
      user => {
        commit('forgotPWRequestSuccess', user)
      },
      error => {
        let errStr = "An unknown error has occurred";
        if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('errors')) {
          errStr = "";
          error.response.data.errors.forEach(function(entry) {
            errStr += entry.title;
          });
        }
        commit('forgotPWRequestFailure', errStr)
        dispatch('alert/error', errStr, { root: true })
      }
    );
  },
  resetPWRequest({ dispatch, commit }, { password, passwordConfirm, token }) {
    commit('resetPWRequest')

    UserService.resetPWRequest(password, passwordConfirm, token).then(
      user => {
        commit('resetPWRequestSuccess', user)
      },
      error => {
        let errStr = "An unknown error has occurred";
        if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('errors')) {
          errStr = "";
          error.response.data.errors.forEach(function(entry) {
            errStr += entry.title;
          });
        }
        commit('resetPWRequestFailure', errStr)
        dispatch('alert/error', errStr, { root: true })
      }
    );
  }
}

const mutations = {
  setStatus(state, status) {
    state.status = status
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user);
  },
  resetState() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
    JwtService.destroyToken();
  },

  [PURGE_AUTH](state) {
    console.log("inside purge auth")
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};

  }
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
