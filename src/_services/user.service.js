// import config from 'config';
import axios from 'axios';

var config = { apiUrl: 'https://ppm-backend-jhouse153.c9users.io' }

export const userService = {
  login,
  logout,
  register
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/auth/login`, requestOptions)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }).catch(function(error) {
      return handleError(error)
    })
}

function register(email, password, passwordConfirm, firstName, lastName) {
  return axios.post(
      `${config.apiUrl}/auth/register`, { email, password, passwordConfirm, firstName, lastName })
    .then(user => {
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

// function getAll() {
//   const requestOptions = {
//     method: 'GET'
//   };

//   return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

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
