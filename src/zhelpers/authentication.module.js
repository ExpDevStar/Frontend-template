import { userService } from '../services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { email, password }) {

      commit('loginRequest', { email })

      userService.login(email, password)
        .then(
          user => {
            commit('loginSuccess', user)
            router.push('/')
          },
          error => {
            commit('loginFailure', error)
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    getUserInfo({ dispatch, commit }) {

      userService.getUserInfo()
        .then(
          user => {
            commit('getUserInfoSuccess', user)
            router.push('/dashboard')
          },
          error => {
            commit('getUserInfoFailure', error)
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    logout({ commit }) {
      userService.logout()
      commit('logout')
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    getUserInfoRequest(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    getUserInfoSuccess(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    getUserInfoFailure(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure(state) {
      state.status = {}
      state.user = null
    },
    logout(state) {
      state.status = {}
      state.user = null
    }
  }
}
