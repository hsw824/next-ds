import withBFFHandler from './utils/withBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { getSearchResult } from 'utils/useAxios';
import { TMDBResponseType } from 'types/responseTypes';
import { NotFoundError } from 'models/CustomErrorClass';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, page = 1 } = req.query;

  const { results, total_pages }: TMDBResponseType = await getSearchResult(query as string, page as string);

  if (!results) {
    throw new NotFoundError('좋아하는 영화 리스트를 찾을 수 없습니다.');
  }

  res.status(200).json({ results, totalPages: total_pages });
};

export default withBFFHandler({ handler });
