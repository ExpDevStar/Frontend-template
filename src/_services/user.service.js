import ApiService from '../api'
// import authHeaders from '../_helpers/auth-header'
export const UserService = {
  checkTokenRequest,
  resetPWRequest
};



function checkTokenRequest(ID) {
  return ApiService.post(`/auth/validatetoken?ID=` + ID)
    .then(response => {
      return response;
    }).catch(function(error) {
      return Promise.reject(error)
    })
}

function resetPWRequest(password, passwordConfirm, ID) {
  return ApiService.post(`/auth/resetpw`, { password, passwordConfirm, ID })
    .then(response => {
      return response;
    })
    .catch(function(error) {
      return Promise.reject(error)
    })
}
