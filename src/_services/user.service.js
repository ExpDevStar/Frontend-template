import Api from '../api.js'

export const userService = {
  login,
  logout,
  register,
  forgotPWRequest,
  checkTokenRequest,
  resetPWRequest
};

function login(email, password) {

  return Api().post(`/auth/login`, { email, password })
    .then(response => {
      const user = response.data
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }).catch(error => {
      return Promise.reject(error)
    })
}

function register(email, password, passwordConfirm, firstName, lastName) {
  return Api().post(`/auth/register`, { email, password, passwordConfirm, firstName, lastName })
    .then(response => {
      const user = response.data
      console.log(user)
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }).catch(function(error) {
      return Promise.reject(error)
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function forgotPWRequest(email) {
  return Api().post(`/auth/forgotpw`, { email })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return Promise.reject(error)
    })
}

function checkTokenRequest(ID) {
  return Api().get(`/auth/validatetoken?ID=` + ID)
    .then(response => {
      return response;
    }).catch(function(error) {
      return Promise.reject(error)
    })
}

function resetPWRequest(password, passwordConfirm, ID) {
  return Api().post(
      `/auth/resetpw`, { password, passwordConfirm, ID })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return Promise.reject(error)
    })
}
