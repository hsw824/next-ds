import withBFFHandler from './utils/withBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { getFavoriteMovies } from 'utils/useAxios';
import { ResponseDataType } from 'types/apiTypes';

export default withBFFHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const pageNum = (req.query.page as string) || 1;
  const { results, total_pages }: ResponseDataType = await getFavoriteMovies(pageNum);
  res.status(200).json({ results, toTalPages: total_pages });
});
