import { Router } from 'express';
import {
  getConversation,
  newConversation,
} from '../controllers/conversation.controller';

const router = Router();

router.post('/', newConversation);
router.get('/:userId', getConversation);

export default router;
