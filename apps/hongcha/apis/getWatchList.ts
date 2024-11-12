import axios from 'axios';

export const getWatchList = async (pageNum: number | string) => {
  const { data } = await axios.get(`/api/getWatchList?page=${pageNum}`);
  return data;
};
