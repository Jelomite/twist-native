export default axios => ({
  getReceived() {
    return axios.get('/api/donation').then(donation => donation.data);
  },
});
