import withBFFHandler from './utils/withBFFHandler';

import { NextApiRequest, NextApiResponse } from 'next';
import { postWatchList } from 'utils/useAxios';
import { ValidError } from 'models/CustomErrorClass';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.mediaType === '' || req.body.mediaType !== 'movie') {
    throw new ValidError('mediaType값 오류');
  }

  if (typeof req.body.mediaId !== 'number') {
    throw new ValidError('mediaId가 Number가 아닙니다.');
  }

  const body = {
    media_type: req.body.mediaType,
    media_id: req.body.mediaId,
    watchlist: req.body.watchlist,
  };
  const response = await postWatchList(body);
  res.status(200).json(response.data);
};

export default withBFFHandler({ handler, allowMethod: 'POST' });
