import { NextApiRequest, NextApiResponse } from 'next';

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

const withPostBFFHandler = (handler: HandlerType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(500).json({ message: '해당 handler는 POST 메서드만 가능합니다.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
};

export default withPostBFFHandler;
