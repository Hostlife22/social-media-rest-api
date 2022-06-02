var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
export const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = new Post(req.body);
    try {
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post.findById(req.params.id);
        if ((post === null || post === void 0 ? void 0 : post.userId) === req.body.userId) {
            yield (post === null || post === void 0 ? void 0 : post.updateOne({ $set: req.body }));
            res.status(201).json('The post has been updated');
        }
        else {
            res.status(403).json('You can update only your post');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post.findById(req.params.id);
        if ((post === null || post === void 0 ? void 0 : post.userId) === req.body.userId) {
            yield (post === null || post === void 0 ? void 0 : post.deleteOne());
            res.status(200).json('The post has been deleted');
        }
        else {
            res.status(403).json('You can deleted only your post');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const post = yield Post.findById(req.params.id);
        if (!((_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.includes(req.body.userId))) {
            yield (post === null || post === void 0 ? void 0 : post.updateOne({ $push: { likes: req.body.userId } }));
            res.status(200).json('The post has been liked');
        }
        else {
            yield post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('The post has been disliked');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const getTimelinePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const currentUser = yield User.findById(req.params.userId);
        if (currentUser) {
            const userPosts = yield Post.find({ userId: currentUser._id });
            const friendPost = yield Promise.all((_b = currentUser === null || currentUser === void 0 ? void 0 : currentUser.followins) === null || _b === void 0 ? void 0 : _b.map((friendId) => Post.find({ userId: friendId })));
            res.status(200).json(userPosts.concat(...friendPost));
        }
        else {
            res.status(200).json("You can't find user posts");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: req.params.username });
        if (user) {
            const posts = yield Post.find({ userId: user._id });
            res.status(200).json(posts);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
