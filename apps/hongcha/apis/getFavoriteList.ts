import axios from 'axios';

export const getFavoriteList = async (pageNum: number | string) => {
  const { data } = await axios.get(`/api/getFavorites?page=${pageNum}`);
  return data;
};
