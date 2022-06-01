import { Router } from 'express';
import { addMessage, getMessage } from '../controllers/message.controller';

const router = Router();

router.post('/', addMessage);
router.get('/:conversationId', getMessage);

export default router;
