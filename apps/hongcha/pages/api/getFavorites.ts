import withBFFHandler from './utils/withBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { getFavoriteMovies } from 'utils/useAxios';
import { NotFoundError, ValidError } from 'models/CustomErrorClass';
import { TMDBResponseType } from 'types/responseTypes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageNum = (req.query.page as string) || 1;
  if (!Number(pageNum) || Number(pageNum) < 1) {
    throw new ValidError('pageNum이 유효하지 않음');
  }
  const { results, total_pages }: TMDBResponseType = await getFavoriteMovies(pageNum);

  if (!results) {
    throw new NotFoundError('좋아하는 영화 리스트를 찾을 수 없습니다.');
  }
  res.status(200).json({ results, toTalPages: total_pages });
};

export default withBFFHandler({ handler });
