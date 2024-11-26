import axios, { AxiosError } from 'axios';
import { PostWatchListType } from 'types/requestType';
import { handleApiError } from './handleApiError';

export const getBFFWatchList = async (pageNum: number | string) => {
  try {
    const { data } = await axios.get(`/api/getWatchList?page=${pageNum}`);
    return data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const postBFFWatchList = async (body: PostWatchListType) => {
  try {
    await axios.post('api/postWatchList', body);
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
