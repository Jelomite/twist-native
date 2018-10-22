export default axios => ({
  getAll() {
    return axios.get('/api/anime').then(anime => anime.data);
  },

  get(id) {
    return axios.get(`/api/anime/${id}`).then(anime => anime.data);
  },

  getSources(id) {
    return axios.get(`/api/anime/${id}/sources`).then(sources => sources.data);
  },
});
