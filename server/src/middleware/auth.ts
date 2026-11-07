import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import User, { Role } from '../models/User';

// Verifies the JWT and attaches the user to req.user
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User no longer exists' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Usage: router.delete('/x', protect, restrictTo('admin'), handler)
export const restrictTo =
  (...roles: Role[]): RequestHandler =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
