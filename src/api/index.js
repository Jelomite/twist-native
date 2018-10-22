import axios from 'axios';

import anime from './anime';
import donation from './donation';
import motd from './motd';
import auth from './auth';
import user from './user';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'x-access-token': process.env.API_TOKEN,
  },
});

const debug = process.env.NODE_ENV !== 'production';
const Mock = debug ? require('./mock').default : () => undefined;

Mock(instance);

export default {
  axios: instance,

  request: {
    anime: anime(instance),
    donation: donation(instance),
    motd: motd(instance),
    auth: auth(instance),
    user: user(instance),
  },
};
