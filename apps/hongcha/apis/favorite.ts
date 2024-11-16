import axios from 'axios';
import { PostFavoriteType } from 'types/requestType';

export const getFavoriteList = async (pageNum: number | string) => {
  const { data } = await axios.get(`/api/getFavorites?page=${pageNum}`);
  return data;
};

export const postFavoriteList = async (body: PostFavoriteType) => {
  await axios.post('/api/postFavorite', body);
};
