import { Router } from 'express';
import uploadFile from '../controllers/file.controller.js';
import upload from '../services/file.services.js';

const router = Router();
router.post('/', upload.single('file'), uploadFile);
export default router;
