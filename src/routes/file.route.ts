import { Router } from 'express';
import uploadFile from '../controllers/file.controller';
import upload from '../services/file.services';

const router = Router();

router.post('/', upload.single('file'), uploadFile);

export default router;
