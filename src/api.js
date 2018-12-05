import axios from 'axios'
import { userService } from './_services';

const tempAxios = axios.create({
  baseURL: `https://ppm-backend-jhouse153.c9users.io`,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

tempAxios.interceptors.response.use(response => response, error => {
  const status = error.response ? error.response.status : null
  console.log("Inside Interceptor. Status: " + status)
  if (status === 401) {
    userService.logout()
  }
  return Promise.reject(error);
});

export default () => {
  return tempAxios
}
