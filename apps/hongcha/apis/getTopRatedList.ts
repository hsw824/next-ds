import axios, { AxiosError } from 'axios';
import { handleApiError } from './handleApiError';

export const getTopRatedList = async (pageNum: number) => {
  try {
    const { data } = await axios.get(`/api/getTopRated?page=${pageNum}`);
    return data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
