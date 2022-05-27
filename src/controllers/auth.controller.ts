import bcrypt from 'bcrypt';
import { Response } from 'express';
import User, { UserDocument } from '../models/user.model';
import { CustomRequest } from '../utils/interface';

export const registerNewUser = async (
  req: CustomRequest<UserDocument>,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user and response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (
  req: CustomRequest<UserDocument>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    !user && res.status(404).json('User not found');

    const validPassword =
      user && (await bcrypt.compare(password, user.password));
    !validPassword && res.status(400).json('Wrong password');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
