import axios from 'axios';

export const getTopRatedList = async (pageNum: number) => {
  const { data } = await axios.get(`/api/getTopRated?page=${pageNum}`);
  return data;
};
