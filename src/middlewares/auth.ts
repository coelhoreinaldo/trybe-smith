import { NextFunction, Request, Response } from 'express';
import jwtFunctions from '../utils/jwtFunctions';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';

const extractToken = (bearerToken:string) => bearerToken.split(' ')[1];

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = extractToken(authorization);
    const decoded = jwtFunctions.verify(token) as User;
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;
