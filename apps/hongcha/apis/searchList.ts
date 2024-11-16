import axios from 'axios';

export const getSearchList = async (searchQuery: string, pageNum: number | string) => {
  const { data } = await axios.get(`/api/getSearchMovie?query=${searchQuery}&page=${pageNum}`);
  return data;
};
