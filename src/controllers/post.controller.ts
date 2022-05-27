import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';

export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.updateOne({ $set: req.body });
      res.status(201).json('The post has been updated');
    } else {
      res.status(403).json('You can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.deleteOne();
      res.status(200).json('The post has been deleted');
    } else {
      res.status(403).json('You can deleted only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post?.likes?.includes(req.body.userId)) {
      await post?.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTimelinePost = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (currentUser) {
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPost = await Promise.all(
        currentUser?.followins?.map((friendId) =>
          Post.find({ userId: friendId })
        )
      );
      res.status(200).json(userPosts.concat(...friendPost));
    } else {
      res.status(200).json("You can't find user posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (user) {
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
