import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
interface IPayload {
  sub: string;
}
class AuthMiddleware {
  auth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        code: 'token.missing',
        message: 'Token missing',
      });
    }
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhpYTJAdGVzdGUuY29tIiwiaWF0IjoxNjg0MzQ2MzIzLCJleHAiOjE2ODQzNDcyMjMsInN1YiI6IjgzNzM0MWQzLTFjOTEtNDQ5Zi04ZGM4LTNmMTJiNzdhMGNiOCJ9.NoyObZDSa0qonv7U5rKMGxNUXSTe7TROU3ENrv97PEs
    const [, token] = authHeader.split(' ');
    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;
    if (!secretKey) {
      throw new Error('There is no token key');
    }
    try {
      const { sub } = verify(token, secretKey) as IPayload;

      request.user_id = sub;
      return next();
    } catch (error) {
      return response.status(401).json({
        code: 'token.expired',
        message: 'Token expired.',
      });
    }
  }
}

export { AuthMiddleware };
