import axios from 'axios';

export const getWatchList = async (pageNum: number | string) => {
  const { data } = await axios.get(`/api/getWatchList?page=${pageNum}`);
  console.log(data, '1111');
  return data;
};
