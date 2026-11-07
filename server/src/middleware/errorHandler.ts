import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
