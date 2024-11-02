import axios, { AxiosRequestConfig } from 'axios';
import { API_ERROR_MESSAGE } from '../constants/axiosErrorMessage';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCOUNT_ID = '21594855';

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

export const getTopRated = async (pageNum: number | string) => {
  const response = await client.get(`/movie/top_rated?language=ko&page=${pageNum}`);
  return response.data;
};

export const getDefaultGenre = async () => {
  const response = await client.get('/genre/movie/list?language=ko');
  return response.data.genres;
};

export const getFavoriteMovies = async (pageNum: number | string) => {
  const response = await client.get(`/account/${ACCOUNT_ID}/favorite/movies?language=ko&page=${pageNum}`);
  return response.data;
};

export const postFavoriteMovie = async (data) => {
  const response = await client.post(`/account/${ACCOUNT_ID}/favorite`, data);
  return response;
};
