export default axios => ({
  signup(form) {
    return axios.post('/api/auth/signup', form).then(response => response.data);
  },

  signin(form) {
    return axios.post('/api/auth/signin', form).then(response => response.data);
  },

  validate(token) {
    return axios.post('/api/auth/validate', { token }).then(response => response.data);
  },
});
