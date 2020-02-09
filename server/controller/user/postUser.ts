import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';


import { MulterFile } from './../../utils/uploadHandler';
import User from './../../models/user';
import imp from './../../utils/imp';
import Photo from './../../models/photo';

export default async (req: Request & { file: MulterFile }, res: Response) => {
  const { file, body } = req;

  if (!file) {
    res.status(400).json({
      status: false,
      content: 'validationError',
      details: [
        {
          message: 'File with field name `avatar` is required.',
        },
      ],
    });
    return;
  }

  try {
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
      res.status(415).send({
        status: false,
        content: newFilePaths,
      });
      return;
    }

    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          {
            userCode: body.userCode,
          },
          {
            email: body.email
          }
        ]
      }
    });

    if (user) {
      res.status(400).send({
        status: false,
        content: `userAlreadyExists`,
      });
      return;
    }

    await User.create({
      ...body,
      photo: {
        thumbnailUrl: newFilePaths.thumbnail,
        originalUrl: newFilePaths.original,
      },
    },
      {
        include: [Photo],
      });

    res.status(200).json({ status: true, content: 1 })
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: false, content: e.message });
    return;
  }
};
