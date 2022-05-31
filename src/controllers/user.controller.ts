import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User, { UserDocument, UserReq } from '../models/user.model';
import { CustomDeleteRequest, CustomUpdateRequest } from '../utils/interface';

export const updateUser = async (req: Request, res: Response) => {
  const { body, user, params } = req as CustomUpdateRequest;
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
};

export const deleteUser = async (req: CustomDeleteRequest, res: Response) => {
  const { body, params } = req;
  if (body.userId === params.id || body.isAdmin) {
    try {
      await User.findByIdAndDelete(params.id);

      res.status(200).json('Account has been delete');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const { username } = req.query;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });

    if (user) {
      const { password, updatedAt, ...other } = user.toJSON();

      res.status(200).json(other);
    } else {
      res.status(403).json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getFriends = async (req: Request, res: Response) => {
  try {
    const user = (await User.findById(req.params.userId)) as UserDocument;
    const friends = await Promise.all(
      user.followins.map((friendId) => {
        return User.findById(friendId);
      })
    );
    const friendList = [] as UserReq[];
    friends.forEach((friend) => {
      const { _id, username, profilePicture } = friend as UserDocument;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const followUser = async (req: Request, res: Response) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user?.followers.includes(req.body.userId)) {
        await user?.updateOne({ $push: { followers: req.body.userId } });
        await currentUser?.updateOne({ $push: { followins: req.params.id } });
        res.status(200).json('User has been followed');
      } else {
        res.status(403).json('You allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can follow yourself');
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user?.followers.includes(req.body.userId)) {
        await user?.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser?.updateOne({ $pull: { followins: req.params.id } });
        res.status(200).json('User has been unfollowed');
      } else {
        res.status(403).json('You dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can unfollow yourself');
  }
};
