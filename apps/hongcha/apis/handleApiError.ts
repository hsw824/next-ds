import { AxiosError } from 'axios';
import { AuthError, NotFoundError, ValidError } from 'models/CustomErrorClass';

export const handleApiError = (error: AxiosError) => {
  if (error.status === 401) {
    throw new AuthError('인증 토큰이 없습니다.');
  }

  if (error.status === 422) {
    throw new ValidError('유효하지 않은 값입니다.');
  }

  if (error.status === 404) {
    throw new NotFoundError('요청한 페이지를 찾을 수 없습니다.');
  }
  throw new Error(error.message);
};
