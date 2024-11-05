import { NextApiRequest, NextApiResponse } from 'next';
import { postWatchList } from 'utils/useAxios';

export default async function postWatchListHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = {
        media_type: req.body.mediaType,
        media_id: req.body.mediaId,
        watchlist: req.body.watchlist,
      };
      const response = await postWatchList(body);
      res.status(200).json(response.data);
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error });
    }
  }
}
