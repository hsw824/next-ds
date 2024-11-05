import { NextApiRequest, NextApiResponse } from 'next';
import { postFavoriteMovie } from 'utils/useAxios';

export default async function postFavoriteHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = {
        media_type: req.body.mediaType,
        media_id: req.body.mediaId,
        favorite: req.body.favorite,
      };
      const response = await postFavoriteMovie(body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
