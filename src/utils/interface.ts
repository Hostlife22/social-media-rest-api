import { Request } from "express";
import { UserDocument } from '../models/user.model';

export interface CustomRequest<T> extends Request {
  body: T;
}

export interface CustomUpdateRequest extends Request {
	user: UserDocument
}