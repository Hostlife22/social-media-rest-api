import { Request, Response } from 'express';
import Conversation from '../models/conversation.model';

export const newConversation = async (req: Request, res: Response) => {
  const newConv = new Conversation({
    members: [req.body.serderId, req.body.receiverId],
  });

  try {
    const saveConversation = await newConv.save();
    res.status(200).json(saveConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConversation = async (req: Request, res: Response) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConvToUser = async (req: Request, res: Response) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
