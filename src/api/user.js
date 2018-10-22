export default axios => ({
  getLibrary({ jwt }) {
    return axios.get('/api/user/library', { headers: { jwt } }).then(response => response.data);
  },

  patchLibrary({ library, episode, jwt }) {
    if (episode) {
      return axios.patch('/api/user/library/episode', episode, { headers: { jwt } }).then(response => response.data);
    }

    return axios.patch('/api/user/library', library, { headers: { jwt } }).then(response => response.data);
  },
});
