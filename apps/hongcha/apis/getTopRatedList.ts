import axios, { AxiosError } from 'axios';
import { AuthError } from 'models/CustomErrorClass';

export const getTopRatedList = async (pageNum: number) => {
  try {
    const { data } = await axios.get(`/api/getTopRated?page=${pageNum}`);
    return data;
  } catch (error) {
    if ((error as AxiosError).status === 401) {
      throw new AuthError('인증 토큰이 없음');
    }
    throw error;
  }
};
