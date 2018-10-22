export default axios => ({
  getMessage() {
    return axios.get('/api/motd').then(motd => motd.data);
  },
});
