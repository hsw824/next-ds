import axios, { AxiosRequestConfig } from 'axios';
import { API_ERROR_MESSAGE } from '../constants/axiosErrorMessage';

const BASE_URL = 'https://api.themoviedb.org/3/movie';

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  skipDefaultHandler: false,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

const client = axios.create(axiosConfig);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status) {
      if (error.config?.skipDefaultHandler) {
        throw error;
      }
      switch (error.response?.status) {
        case 400:
          console.warn(API_ERROR_MESSAGE.INVALID_REQUEST);
          break;

        case 404:
          console.warn(API_ERROR_MESSAGE.NOT_EXIST);
          break;

        case 500:
          console.warn(API_ERROR_MESSAGE.SERVER_ERROR);
          break;
      }
    }
  },
);

export const getTopRated = async () => {
  const response = await client.get('/top_rated?language=ko&page=1');
  return response.data.results;
};
