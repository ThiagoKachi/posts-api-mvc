import { Response } from 'express';

export function responseSuccess(res: Response, data: any, status = 200, message?: string) {
  return res.status(status).json({
    success: true,
    ...(message ? { message } : {}),
    data,
  });
}
