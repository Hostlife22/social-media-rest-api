import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { CustomUpdateRequest } from 'src/utils/interface';
import User from '../models/user.model';

const router = Router();

// update user
router.put('/:id', async (req: Request, res: Response) => {
	const {body, user, params } = req as CustomUpdateRequest
  if (body.userId === params.id || user.isAdmin) {
    if (body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      await User.findByIdAndUpdate(params.id, {
        $set: req.body,
      });

      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
});

// delete user

// get a user

// follow a user

// unfollow a user

export default router;


