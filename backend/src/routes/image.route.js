

import { Router } from 'express';
const router = Router(); 

import { ImageController } from '../controllers/index.controller.js';  

router.get('/image/query', ImageController.getImage);
router.post('/image/upload', ImageController.uploadImage);

export default router;