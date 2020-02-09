import { Request, Response, NextFunction } from "express";
import User from "./../models/user";
import Photo from "../models/photo";

const jwt = require('jsonwebtoken');

const topSecret = 'noOneNeedsToKnow';

export const createToken = (payload: object) => jwt.sign(payload, topSecret);
export const authenticate = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new Error('noToken');
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const payload = await jwt.verify(token, topSecret)
    if (!payload.userCode) {
      throw new Error('invalidToken');
    }

    const user = await User.findOne({ where: { userCode: payload.userCode }, include: [Photo] })

    if (!user) {
      res.status(404).json({
        status: false,
        content: 'noSuchUser'
      });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError') {
      next(new Error('invalidToken'));
      return;
    }
    next(e);
  }
}
