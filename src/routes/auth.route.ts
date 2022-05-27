import { Router } from 'express';
import { login, registerNewUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerNewUser);
router.post('/login', login);

export default router;
