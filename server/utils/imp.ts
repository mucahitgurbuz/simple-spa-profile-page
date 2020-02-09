import { existsSync, unlinkSync } from 'fs';
import mmm from 'mmmagic';
import sharp from 'sharp';

const { Magic, MAGIC_MIME_TYPE } = mmm;

const magic = new Magic(MAGIC_MIME_TYPE);

const { api } = require('./../server-config.json');

if (!api.rootDir) {
  console.error('Configuration file is old. Please run `yarn configure` again.');
  process.exit();
}

const config = {
  tempImgPath: `${api.rootDir}/server/uploads`,
  publicImgPath: `${api.rootDir}/server/images`,
  serverRoot: `${api.rootDir}/server`,
  userPhotoSizes: {
    width: {
      min: 150,
      thumbnail: 100,
      max: 800,
    },
    height: {
      min: 150,
      thumbnail: 100,
      max: 800,
    },
  },
};

function validateImage(imagePath: string) {
  return new Promise<boolean | string>((resolve, reject) => {
    magic.detectFile(imagePath, (error, result) => {
      if (error) {
        resolve('cannotDetectFileType');
        return;
      }

      if (result !== 'image/jpeg' && result !== 'image/png') {
        resolve('wrongImageFormat');
        return;
      }

      resolve(true)
    });
  });
}

function resampleUserImage(imagePath: string) {
  return new Promise<{ original: string, thumbnail: string } | string>((resolve, reject) => {
    if (!existsSync(imagePath)) {
      resolve('fileDoesNotExist');
      return;
    }

    const fileName = `${
      imagePath
        .split('/')
        .slice(-1)[0]
        .split('.')[0]
      }.jpg`

    try {
      const originalImage = sharp(imagePath).on('error', () => {
        throw new Error('notAProperImageFile');
      });

      const thumbnailImage = originalImage.clone();

      Promise.all([
        originalImage.metadata().then((metaData: sharp.Metadata) => {
          if (!metaData.width || !metaData.height) {
            throw new Error('imageMetadataMissing');
          }

          if (metaData.width < config.userPhotoSizes.width.min || metaData.height < config.userPhotoSizes.height.min) {
            throw new Error('imageTooSmall');
          }
          const photoHeight =
            metaData.height > config.userPhotoSizes.height.max ? config.userPhotoSizes.height.max : metaData.height;

          return originalImage
            .resize(undefined, photoHeight)
            .jpeg()
            .toFile(`${config.publicImgPath}/original/${fileName}`);
        }),
        thumbnailImage
          .resize(config.userPhotoSizes.width.thumbnail, config.userPhotoSizes.height.thumbnail)
          .jpeg()
          .toFile(`${config.publicImgPath}/thumbnail/${fileName}`),
      ])
        .then(() => {
          unlinkSync(imagePath);
          resolve({
            original: `images/original/${fileName}`,
            thumbnail: `images/thumbnail/${fileName}`,
          });
        })

    } catch (e) {
      if (existsSync(imagePath)) unlinkSync(imagePath);
      resolve(e.message);
    }

  });
}

function removeImages(imageUrls: string[]) {
  imageUrls.forEach((imageUrl: string) => {
    if (imageUrl.substr(0, 4) === 'http') {
      return;
    }
    if (existsSync(`${config.serverRoot}/${imageUrl}`)) unlinkSync(`${config.serverRoot}/${imageUrl}`);
  });
}

function deleteFile(path: string) { return existsSync(path) && unlinkSync(path); }


export default {
  deleteFile,
  removeImages,
  resampleUserImage,
  validateImage
}