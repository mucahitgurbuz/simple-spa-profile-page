import User from "./../../models/user";
import { Request, Response } from "express";

export default async (req: Request & { user: User }, res: Response) => {
  try {
    const [, updatedUsers] = await User.update(
      {
        password: req.body.newPassword,
      },
      {
        where: {
          userCode: req.user.userCode,
        },
        individualHooks: true,
      }
    );

    res.status(200).json({ status: true, content: updatedUsers[0].id });
  } catch (e) {
    res.status(500).json({ status: false, content: e.message });
  }
}