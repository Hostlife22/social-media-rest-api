import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

export const registerNewUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { username, email, password } = req.body;
      // generate new password
      const salt = yield bcrypt.genSalt(10);
      const hashedPassword = yield bcrypt.hash(password, salt);
      // create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      // save user and response
      const user = yield newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
export const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, password } = req.body;
      const user = yield User.findOne({ email });
      !user && res.status(404).json('User not found');
      const validPassword =
        user && (yield bcrypt.compare(password, user.password));
      !validPassword && res.status(400).json('Wrong password');
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
