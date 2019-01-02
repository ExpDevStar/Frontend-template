export function authHeader() {
  // return authorization header with jwt token
  const u = JSON.parse(localStorage.getItem('user'));
  if (u) {
    return { headers: { Authorization: "Bearer " + u.token } };
  }
  else {
    return {};
  }
}
