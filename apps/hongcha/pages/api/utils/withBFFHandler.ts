import { AuthError, MethodError, NotFoundError, ValidError } from 'models/CustomErrorClass';
import { NextApiRequest, NextApiResponse } from 'next';

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<any>;

interface BFFHandlerType {
  handler: HandlerType;
  allowMethod?: 'GET' | 'POST';
}

const withBFFHandler = ({ handler, allowMethod = 'GET' }: BFFHandlerType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN) {
        throw new AuthError('인증 토큰이 없음');
      }

      if (req.method !== allowMethod) {
        throw new MethodError(`${allowMethod} 메서드만 사용가능합니다.`);
      }

      await handler(req, res);
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json({ message: error.message, error });
      }
      if (error instanceof ValidError) {
        res.status(error.statusCode).json({ message: error.message, error });
      }

      if (error instanceof MethodError) {
        res.status(error.statusCode).json({ message: error.message, error });
      }

      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message, error });
      }

      res.status(500).json({ message: '알수없는 오류', error });
    }
  };
};

export default withBFFHandler;
