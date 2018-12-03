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
      console.log("response.data")
      console.log(response.data)
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }).catch(function(error) {
      console.log("error")
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
    }).catch(function(error) {
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
    }).catch(function(error) {
      return handleError(error)
    })
}


function handleError(error) {
  if (error.response.status === 401) {
    logout()
    location.reload(true)
  }
  else {
    if (error.response.status >= 400 && error.response.status <= 499) {
      var errorsArr = error.response.data.Errors
      Promise.reject(errorsArr)
    }
    else {
      return Promise.reject("server_error")
    }
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
