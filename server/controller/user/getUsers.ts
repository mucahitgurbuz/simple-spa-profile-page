import isSuperAdmin from './../../utils/isSuperAdmin';
import { Request, Response } from 'express';
import User from './../../models/user';

export default async (req: Request & { user: User }, res: Response) => {
  try {
    const userIsAdmin: boolean = await isSuperAdmin(req.user.userCode);
    if (!userIsAdmin) {
      throw new Error('permissionDenied');
    }

    const users: User[] = await User.findAll()

    res.status(200).json({ status: true, content: users } || []);

  } catch (e) {
    if (e.message === 'permissionDenied') {
      res.status(403).send({
        status: false,
        content: 'permissionDenied',
      });

      return;
    }

    res.status(500).send({ status: false, content: e.message });
  }
};
