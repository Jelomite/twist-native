import MockAdapter from 'axios-mock-adapter';

import allAnime from './anime/all.json';
import oneAnime from './anime/one.json';
import sources from './anime/sources.json';
import library from './anime/library.json';

export const donation = {
  remaining: 31.88,
  target: 75.00,
  received: 43.12,
};

export const motd = {
  message: '💬 Welcome to Anime twist\n🔷 Diamonds and anime',
  id: 1,
  title: '21st June 2018',
};

export const user = {
  id: 8,
  username: 'Nallown',
  rank: 3,
  donation_rank: 0,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.CMveS4-OxJpT61UeC5ZUdZYdQVOH1dixv50YwqEWMNc',
};

export const venator = {
  id: 2,
  username: 'Venator',
  rank: 3,
  donation_rank: 1,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Mg.8uS8mt4pSTinguMKWwGNyjRIJbWr5iiElBYqd1EQfJk',
};

export const ban = {
  reason: 'no reason',
  user,
  expires_at: new Date(new Date().setSeconds(new Date().getSeconds() + 30)),
};

export default (axios) => {
  const mock = new MockAdapter(axios, { delayResponse: 600 });

  mock.onGet('/api/anime').reply(200, allAnime);

  mock.onGet('/api/anime/air').reply(403, ban);

  mock.onGet('/api/anime/no-episodes').reply((config) => {
    const urlSplit = config.url.split('/');
    const slug = urlSplit[urlSplit.length - 1];
    const anime = Object.assign({}, allAnime[0]);

    anime.episodes = [];
    anime.id = oneAnime.episodes[0].anime_id;
    anime.description = oneAnime.description;

    return [200, anime];
  });

  mock.onGet(/\/api\/anime\/.*\/sources/).reply(() =>
    new Promise((resolve) => {
      setTimeout(() => resolve([200, sources]), 600);
    }),
  );

  mock.onGet(/\/api\/anime\/*/).reply((config) => {
    const urlSplit = config.url.split('/');
    const slug = urlSplit[urlSplit.length - 1];
    const shortAnime = allAnime.filter(anim => anim.slug.slug === slug)[0];

    if (!shortAnime) {
      return [404];
    }

    const anime = Object.assign({}, shortAnime);

    anime.episodes = oneAnime.episodes;
    anime.id = oneAnime.episodes[0].anime_id;
    anime.description = oneAnime.description;

    return [200, anime];
  });

  mock.onGet('/api/donation').reply(200, donation);

  mock.onGet('/api/motd').reply(200, motd);

  mock.onPost('/api/auth/validate', { token: 'error' }).reply(422);

  mock.onPost('/api/auth/validate').reply(200);

  mock.onPost('/api/auth/signup', {
    username: 'admin',
    email: 'admin@email',
    password: 'password123',
    password_confirm: 'password123',
  }).reply(422, {
    errors: [
      { message: 'Username already in use' },
    ],
  });

  mock.onPost('/api/auth/signup').reply(200);

  mock.onPost('/api/auth/signin', {
    username: 'admin',
    password: '',
  }).reply(422, {
    errors: [
      { message: 'Invalid password provided' },
    ],
  });

  mock.onPost('/api/auth/signin', {
    username: 'banned',
    password: '',
  }).reply(403, ban);

  mock.onPost('/api/auth/signin', {
    username: 'venator',
    password: '',
  }).reply(200, venator);

  mock.onPost('/api/auth/signin').reply(200, user);

  mock.onGet('/api/user/library').reply((config) => {
    if (config.headers.jwt !== user.token) {
      return [401];
    }

    return [200, library];
  });

  mock.onPatch('/api/user/library').reply((config) => {
    if (config.headers.jwt !== user.token) {
      return [401];
    }

    const data = JSON.parse(config.data);
    const response = { ...library };

    Object.keys(data).forEach((animeId) => {
      const anime = data[animeId];

      Object.keys(anime).forEach((episodeId) => {
        const episode = anime[episodeId];

        if (episode.completed) {
          if (!response[animeId]) {
            response[animeId] = { };
          }

          response[animeId][episodeId] = episode;

          if (
            !response[animeId]['lastCompleted']
            || new Date(response[animeId]['lastCompleted'].watched_at) < new Date(episode.watched_at)
          ) {
            response[animeId]['lastCompleted'] = episode;
          }
        }

        if (
          !response[animeId]['lastWatched']
          || new Date(response[animeId]['lastWatched'].watched_at) < new Date(episode.watched_at)
        ) {
          response[animeId]['lastWatched'] = episode;
        }
      });
    });

    return [200, response];
  });

  mock.onPatch('/api/user/library/episode').reply((config) => {
    if (config.headers.jwt !== user.token) {
      return [401];
    }

    const episode = JSON.parse(config.data);
    return [200, episode];
  });
};
