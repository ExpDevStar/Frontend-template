import { userService } from '../_services';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { email, password }) {
      commit('loginRequest', { email });

      userService.login(email, password)
        .then(
          user => {
            commit('loginSuccess', user);
            router.push('/dashboard');
          },
          error => {
            commit('loginFailure', error)
            dispatch('alert/error', error, { root: true });
          }
        );
    },
    register({ dispatch, commit }, { email, password, passwordConfirm, firstName, lastName }) {
      commit('registerRequest', { email });

      userService.register(email, password, passwordConfirm, firstName, lastName)
        .then(
          user => {
            commit('registerSuccess', user);
            router.push('/dashboard');
          },
          error => {
            commit('registerFailure', error)
            dispatch('alert/error', error, { root: true });
          }
        );
    },
    logout({ commit }) {
      userService.logout()
      commit('logout')
    },
    forgotPWRequest({ dispatch, commit }, { email }) {
      commit('forgotPWRequest')

      userService.forgotPWRequest(email).then(
        user => {
          commit('forgotPWRequestSuccess', user)
        },
        error => {
          commit('forgotPWRequestFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      );
    },
    resetPWRequest({ dispatch, commit }, { password, passwordConfirm, token }) {
      commit('resetPWRequest')

      userService.resetPWRequest(password, passwordConfirm, token).then(
        user => {
          commit('resetPWRequestSuccess', user)
        },
        error => {
          commit('resetPWRequestFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      );
    },
    checkTokenRequest({ dispatch, commit }, { token }) {
      commit('checkTokenRequest')
      userService.checkTokenRequest(token).then(
        user => {
          commit('checkTokenRequestSuccess', user)
        },
        error => {
          commit('checkTokenRequestFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      );
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = { loggingIn: false };
      state.user = null;
    },
    registerRequest(state, user) {
      state.status = { registering: true };
      state.user = user;
    },
    registerSuccess(state, user) {
      state.status = { registered: true };
      state.user = user;
    },
    registerFailure(state) {
      state.status = { registering: false };
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    forgotPWRequest(state) {
      state.status = { requestingForgotPW: true };
      state.user = null;
    },
    forgotPWRequestSuccess(state) {
      state.status = { requestingForgotPW: false };
      state.user = null;
    },
    forgotPWRequestFailure(state) {
      state.status = { requestingForgotPW: false };
      state.user = null;
    },
    resetPWRequest(state) {
      state.status = { requestingPWReset: true };
      state.user = null;
    },
    resetPWRequestSuccess(state) {
      state.status = { requestingPWReset: false };
      state.user = null;
    },
    resetPWRequestFailure(state) {
      state.status = { requestingPWReset: false };
      state.user = null;
    },
    checkTokenRequest(state) {
      state.status = { checkTokenRequest: true };
      state.user = null;
    },
    checkTokenRequestSuccess(state) {
      state.status = { checkTokenRequest: false };
      state.user = null;
    },
    checkTokenRequestFailure(state) {
      state.status = { checkTokenRequest: false };
      state.user = null;
    }

  }
}
