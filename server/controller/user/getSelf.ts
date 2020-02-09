import { Request, Response } from 'express';
import User from './../../models/user';

export default async (req: Request & { user: User }, res: Response) => {
  res.status(200).json({
    status: true,
    content: req.user,
  });
};
