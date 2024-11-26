import axios, { AxiosError } from 'axios';
import { handleApiError } from './handleApiError';

export const getSearchList = async (searchQuery: string, pageNum: number | string) => {
  try {
    const { data } = await axios.get(`/api/getSearchMovie?query=${searchQuery}&page=${pageNum}`);
    return data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
