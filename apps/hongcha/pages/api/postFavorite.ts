import withPostBFFHandler from './utils/withPostBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { postFavoriteMovie } from 'utils/useAxios';

export default withPostBFFHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    media_type: req.body.mediaType,
    media_id: req.body.mediaId,
    favorite: req.body.favorite,
  };
  const response = await postFavoriteMovie(body);
  res.status(200).json(response.data);
});
