import { Request, Response } from 'express';

import isSuperAdmin from './../../utils/isSuperAdmin';
import imp from './../../utils/imp';
import { MulterFile } from './../../utils/uploadHandler';
import User from './../../models/user';
import Photo from './../../models/photo';

export default async (req: Request & { file: MulterFile, user: User }, res: Response) => {
  const { file, body, user } = req;

  try {
    const userIsAdmin: boolean = await isSuperAdmin(user.userCode);

    if (!userIsAdmin && body.userCode !== user.userCode) {
      throw new Error('permissionDenied');
    }

    if (!file) {
      const updatedRows = await User.update(
        {
          fname: body.fName,
          lName: body.lName
        }, {
          where: {
            userCode: body.userCode
          }
        }
      );

      if (!updatedRows) {
        res.status(404).json({ status: false, content: 'noSuchUser' });
        return;
      }

      res.status(200).json({
        status: true,
        content: 1
      });
    } else {
      const validationStatus = await imp.validateImage(file.path);

      if (validationStatus !== true) {
        res.status(415).json({
          status: false,
          content: validationStatus
        });
        return;
      }

      const newFilePaths = await imp.resampleUserImage(file.path);

      if (typeof newFilePaths === 'string') {
        res.status(415).json({
          status: false,
          content: newFilePaths
        });
        return;
      }

      const userToUpdate = await User.findOne({ where: { userCode: body.userCode }, include: [Photo] });

      if (!userToUpdate) {
        res.status(404).json({ status: false, content: 'noSuchUser' });
        return;
      }

      const { originalUrl: oldOriginalUrl, thumbnailUrl: oldThumbnailUrl } = userToUpdate.photo;

      await userToUpdate.update({
        fName: body.fName,
        lName: body.lName
      });
      await userToUpdate.photo.update({
        originalUrl: newFilePaths.original,
        thumbnailUrl: newFilePaths.thumbnail,
      });

      imp.removeImages([oldOriginalUrl, oldThumbnailUrl]);

      res.status(200).json({ status: true, content: 1 });
    }
  } catch (e) {
    res.status(500).json({
      status: false,
      content: e.message
    });
  }
};
