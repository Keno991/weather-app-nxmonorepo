/* eslint-disable no-param-reassign */
import axiosClient from 'axios';

import { env } from '../utils/env.util';

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

instance.interceptors.request.use(
  config => {
    if (config.url?.includes(env.weatherApi.url))
      config.params.key = env.weatherApi.apiKey;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
