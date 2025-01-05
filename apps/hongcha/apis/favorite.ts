import axios, { AxiosError } from 'axios';
import { PostFavoriteType } from 'types/requestType';
import { handleApiError } from './handleApiError';

export const getFavoriteList = async (pageNum: number | string) => {
  try {
    const { data } = await axios.get(`/api/getFavorites?page=${pageNum}`);
    return data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const postFavoriteList = async (body: PostFavoriteType) => {
  try {
    await axios.post('/api/postFavorite', body);
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
