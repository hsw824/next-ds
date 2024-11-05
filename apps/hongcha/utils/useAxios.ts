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

export const postFavoriteMovie = async (data: { media_type: string; media_id: number; favorite: string }) => {
  const response = await client.post(`/account/${ACCOUNT_ID}/favorite`, data);
  return response;
};

export const getDetailMovie = async (id: string) => {
  const response = await client.get(`/movie/${id}?language=ko`);
  return response.data;
};

/**
 * 나중에 보기에 영화 추가
 *
 * @param data - Watchlist 요청 데이터
 * @param data.media_type - 미디어 타입 ('movie') -> 현재 movie로 고정
 * @param data.media_id - 미디어 ID
 * @param data.watchlist - true면 추가, false면 제거
 *
 * @returns axios 응답 객체를 포함한 Promise
 *
 * @throws {Error} ACCOUNT_ID가 설정되지 않은 경우
 * @throws {AxiosError} API 요청 실패시
 *
 * @example
 * ```ts
 * // 영화를 watchlist에 추가
 * await postWatchList({
 *   media_type: 'movie',
 *   media_id: 123,
 *   watchlist: true
 * });
 * ```
 */
export const postWatchList = async (data: { media_type: string; media_id: number; watchlist: boolean }) => {
  const response = await client.post(`/account/${ACCOUNT_ID}/watchlist`, data);
  return response;
};

export const getWatchList = async (pageNum: string | number) => {
  const response = await client.get(
    `/account/${ACCOUNT_ID}/watchlist/movies?language=ko&page=${pageNum}&sort_by=created_at.asc`,
  );
  return response.data;
};

export const getSearchResult = async (query: string, pageNum: string | number) => {
  const response = await client.get(`search/movie?query=${query}&include_adult=false&language=ko&page=${pageNum}`);

  return response.data;
};
