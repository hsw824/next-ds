import { NextApiRequest, NextApiResponse } from 'next';
import { getWatchList } from 'utils/useAxios';
import { ResponseDataType } from 'types/movieTypes';
import withBFFHandler from './utils/withBFFHandler';

export default withBFFHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const pageNum = (req.query.page as string) || 1;

  const { results, total_pages }: ResponseDataType = await getWatchList(pageNum);
  res.status(200).json({ results, totalPages: total_pages });
});
