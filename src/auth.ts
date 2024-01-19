import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './secrets';
import { User } from '@prisma/client';
import { prisma } from './services/user.services';

declare global {
  namespace Express {
    interface Request {
      user?: User; // This is the property you want to add
    }
  }
}


const authenticateBearerToken = async (req:Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Bearer token not provided' });
  }

  try {
  

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: {
        user_id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(403).json({ error: 'Forbidden - User not found' });
    }

    req.user = user;


    next();
  } catch (error: any) {
    console.error('Error verifying token:', error);

    if (error.name === 'JsonWebTokenError' && error.message === 'jwt malformed') {
      return res.status(403).json({ error: 'Forbidden - Invalid token format' });
    }

    return res.status(403).json({ error: 'Forbidden - Invalid token', details: error.message });
  }
};

export default authenticateBearerToken;
