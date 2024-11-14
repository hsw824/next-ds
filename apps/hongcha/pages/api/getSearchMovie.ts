import { NextApiRequest, NextApiResponse } from 'next';
import { getSearchResult } from 'utils/useAxios';
import { ResponseDataType } from 'types/movieTypes';

export default async function getSearchHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query, page = 1 } = req.query;

  try {
    const { results, total_pages }: ResponseDataType = await getSearchResult(query as string, page as string);
    // const topRatedInstances = results.map((result) => new searchMovieResult(result, genre));
    res.status(200).json({ results, totalPages: total_pages });
  } catch (error) {
    res.status(500).json({ message: '에러', error });
  }
}
