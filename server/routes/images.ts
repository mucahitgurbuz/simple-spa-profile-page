import { Router } from 'express';
import imageController from './../controller/image'

export const images = Router()

images.route('/:type/:filename').get(imageController);
