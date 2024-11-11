import { NextApiRequest, NextApiResponse } from 'next';

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

const withBFFHandler = (handler: HandlerType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ message: '에러', error });
    }
  };
};

export default withBFFHandler;
