var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user, params } = req;
    if (body.userId === params.id || user.isAdmin) {
        if (body.password) {
            try {
                const salt = yield bcrypt.genSalt(10);
                req.body.password = yield bcrypt.hash(body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            yield User.findByIdAndUpdate(params.id, {
                $set: req.body,
            });
            res.status(200).json('Account has been updated');
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json('You can update only your account!');
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, params } = req;
    if (body.userId === params.id || body.isAdmin) {
        try {
            yield User.findByIdAndDelete(params.id);
            res.status(200).json('Account has been delete');
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json('You can delete only your account!');
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const { username } = req.query;
    try {
        const user = userId
            ? yield User.findById(userId)
            : yield User.findOne({ username });
        if (user) {
            const _a = user.toJSON(), { password, updatedAt } = _a, other = __rest(_a, ["password", "updatedAt"]);
            res.status(200).json(other);
        }
        else {
            res.status(403).json({});
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield User.findById(req.params.userId));
        const friends = yield Promise.all(user.followins.map((friendId) => {
            return User.findById(friendId);
        }));
        const friendList = [];
        friends.forEach((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId !== req.params.id) {
        try {
            const user = yield User.findById(req.params.id);
            const currentUser = yield User.findById(req.body.userId);
            if (!(user === null || user === void 0 ? void 0 : user.followers.includes(req.body.userId))) {
                yield (user === null || user === void 0 ? void 0 : user.updateOne({ $push: { followers: req.body.userId } }));
                yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({ $push: { followins: req.params.id } }));
                res.status(200).json('User has been followed');
            }
            else {
                res.status(403).json('You allready follow this user');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('You can follow yourself');
    }
});
export const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId !== req.params.id) {
        try {
            const user = yield User.findById(req.params.id);
            const currentUser = yield User.findById(req.body.userId);
            if (user === null || user === void 0 ? void 0 : user.followers.includes(req.body.userId)) {
                yield (user === null || user === void 0 ? void 0 : user.updateOne({ $pull: { followers: req.body.userId } }));
                yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.updateOne({ $pull: { followins: req.params.id } }));
                res.status(200).json('User has been unfollowed');
            }
            else {
                res.status(403).json('You dont follow this user');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('You can unfollow yourself');
    }
});
