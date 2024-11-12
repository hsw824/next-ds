import withPostBFFHandler from './utils/withPostBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { postWatchList } from 'utils/useAxios';

export default withPostBFFHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    media_type: req.body.mediaType,
    media_id: req.body.mediaId,
    watchlist: req.body.watchlist,
  };
  const response = await postWatchList(body);
  res.status(200).json(response.data);
});
