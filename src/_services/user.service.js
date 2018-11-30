// import config from 'config';
import axios from 'axios';

var config = { apiUrl: 'https://ppm-backend-jhouse153.c9users.io' }

export const userService = {
  login,
  logout,
  register,
  forgotPWRequest,
  checkTokenRequest,
  resetPWRequest
};

function login(email, password) {

  return axios.post(`${config.apiUrl}/auth/login`, { email, password })
    .then(response => {
      const user = response.data
      console.log(user)
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
    .catch(function(error) {
      return handleError(error)
    })

}

function register(email, password, passwordConfirm, firstName, lastName) {
  return axios.post(`${config.apiUrl}/auth/register`, { email, password, passwordConfirm, firstName, lastName })
    .then(response => {
      const user = response.data
      console.log(user)
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function forgotPWRequest(email) {
  return axios.post(
      `${config.apiUrl}/auth/forgotpw`, { email })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return handleError(error)
    })
}

function checkTokenRequest(ID) {
  return axios.get(
      `${config.apiUrl}/auth/validatetoken`, { ID })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return handleError(error)
    })
}


function handleError(error) {
  if (error.response.status === 401) {
    logout()
    location.reload(true)
  }
  else {
    const tempError = (error.response && error.response.data.message) || error.response.statusText;
    return Promise.reject(tempError)
  }

}

function resetPWRequest(password, passwordConfirm, ID) {
  return axios.post(
      `${config.apiUrl}/auth/resetpw`, { password, passwordConfirm, ID })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return handleError(error)
    })
}
