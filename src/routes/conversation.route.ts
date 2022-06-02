import { Router } from 'express';
import {
  getConversation,
  getConvToUser,
  newConversation,
} from '../controllers/conversation.controller';

const router = Router();

router.post('/', newConversation);
router.get('/:userId', getConversation);
router.get('/find/:firstUserId/:secondUserId', getConvToUser);

export default router;
