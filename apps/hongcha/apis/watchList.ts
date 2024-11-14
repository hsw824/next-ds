import axios from 'axios';
import { PostWatchListType } from 'types/requestType';

export const getBFFWatchList = async (pageNum: number | string) => {
  const { data } = await axios.get(`/api/getWatchList?page=${pageNum}`);
  return data;
};

export const postBFFWatchList = async (body: PostWatchListType) => {
  await axios.post('api/postWatchList', body);
};
