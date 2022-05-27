import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePost,
  getUserPosts,
  likePost,
  updatePost,
} from '../controllers/post.controller';

const router = Router();

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.get('/:id', getPost);
router.get('/timeline/:userId', getTimelinePost);
router.get('/profile/:username', getUserPosts);

export default router;
