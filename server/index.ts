import { createServer } from 'http';
import { app } from './app';
import path from 'path'
import fs from 'fs';
import { sequelize } from './db'

if (!fs.existsSync(path.join(__dirname, 'server-config.json'))) {
  console.error('Configuration files are missing. Please run `yarn configure` first.');
  process.exit();
}

import config from './server-config.json';

const production = process.env.NODE_ENV === 'production';
(async () => {
  await sequelize.sync({ force: !production });

  createServer(app)
    .listen(config.api.port, () => console.info(`listening on port ${config.api.port}`));
})();
