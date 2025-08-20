import { NextFunction, Request, Response } from 'express';
import { AppError } from './app-error';

export const asyncHandler = async (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }

  console.error(`Unexpected error: ${error}`);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
