import { Request, Response } from 'express';

const uploadFile = (req: Request, res: Response) => {
  try {
    return res.status(200).json('File uploded successfully');
  } catch (error) {
    console.error(error);
  }
};

export default uploadFile;
