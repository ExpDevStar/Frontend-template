import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { authHeader } from './_helpers/auth-header'
// import { userService } from './_services';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = 'https://open-backend-jhouse153.c9users.io';

    Vue.axios.interceptors.request.use(function(response) {
      return response;
    }, function(error) {
      console.log("ERROR request")
      console.log(error)
      return Promise.reject(error);
    });

    Vue.axios.interceptors.response.use(function(response) {
      return response;
    }, function(error) {

      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        alert("refresh token")
      }
      else if (error.response.status >= 500) {
        return Promise.reject("There is an unknown error2");
      }
      else {
        return Promise.reject("There is an unknown error2");
      }
      return Promise.reject(error);
    });

  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${authHeader}`;
  },
  get(resource) {
    return Vue.axios.get(resource, authHeader());
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params, authHeader());
  },
  update(resource, params) {
    return Vue.axios.put(`${resource}`, params, authHeader());
  },
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params, authHeader());
  },
  delete(resource) {
    return Vue.axios.delete(resource, authHeader()).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

















// import axios from 'axios'
// import { userService } from './_services';

// const tempAxios = axios.create({
//   baseURL: `https://ppm-backend-jhouse153.c9users.io`,
//   withCredentials: false,

//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// })


// tempAxios.interceptors.response.use(response => response, error => {
//   const status = error.response ? error.response.status : null
//   console.log("Inside Interceptor. Status: " + status)
//   if (status === 401) {
//     userService.logout()
//   }
//   return Promise.reject(error);
// });

// export default () => {
//   return tempAxios
// }
