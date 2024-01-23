import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './secrets';
import { User } from '@prisma/client';
import { prisma } from './services/user.services';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}

const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const getUserByToken = async (token: string) => {
  const decoded: any = verifyToken(token);
  return await prisma.user.findFirst({
    where: {
      user_id: decoded.userId,
    },
  });
};

const authenticateBearerToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Bearer token not provided' });
  }

  console.log('Received token:', token);
  try {
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(403).json({ error: 'Forbidden - User not found' });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error('Error verifying token:', error);

    if (error.name === 'JsonWebTokenError' && error.message === 'jwt malformed') {
      return res.status(403).json({ error: 'Forbidden - Invalid token format', details: error.message });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Forbidden - Invalid token', details: error.message });
    } else {
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
};

export default authenticateBearerToken;
