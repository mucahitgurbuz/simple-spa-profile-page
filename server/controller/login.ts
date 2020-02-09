import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { createToken } from './../utils/jwt';
import User from './../models/user';

export default async (req: Request, res: Response) => {
  try {
    const user = await User
      .findOne({
        where: { userCode: req.query.userCode },
        attributes: {
          include: ['password'],
        },
      });

    if (user === null) {
      throw new Error('noSuchUser');
    }

    const status = await bcrypt.compare(req.query.password, user.get('password'));
    if (!status) {
      throw new Error('wrongPassword');
    }

    res.status(200).json({
      status: true,
      content: createToken({
        userCode: req.query.userCode,
      }),
    });
  } catch (e) {
    if (e.message === 'wrongPassword') {
      res.status(400).json({
        status: false,
        content: 'wrongPassword',
      });
      return;
    }

    if (e.message === 'noSuchUser') {
      res.status(400).json({
        status: false,
        content: 'noSuchUser',
      });
      return;
    }

    console.error(e);
    res.status(500).json({
      status: false,
      content: 'somethingWentWrong',
      details: e.message,
    });
  }
};
