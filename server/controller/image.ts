import fs from 'fs';
import mmm from 'mmmagic'
import { Request, Response } from 'express';

const { MAGIC_MIME_TYPE, MAGIC_MIME_ENCODING, Magic } = mmm;
import configuration from './../server-config.json';

if (!configuration.api.rootDir) {
  console.error('Configuration file is old. Please run `yarn configure` again.');
  process.exit();
}

const magic = new Magic(MAGIC_MIME_TYPE | MAGIC_MIME_ENCODING); // eslint-disable-line no-bitwise

export default (req: Request, res: Response) => {
  const { type, filename } = req.params;

  const filePath = `${configuration.api.rootDir}/server/images/${type}/${filename}`;

  if (!fs.existsSync(filePath)) {
    res.status(404).send('Image Not Found');
    return;
  }
  magic.detectFile(filePath, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
      return;
    }

    res.set('Content-Type', result);
    res.status(200);

    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(res);
  });
};
