"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvToUser = exports.getConversation = exports.newConversation = void 0;
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const newConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newConv = new conversation_model_1.default({
        members: [req.body.serderId, req.body.receiverId],
    });
    try {
        const saveConversation = yield newConv.save();
        res.status(200).json(saveConversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.newConversation = newConversation;
const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield conversation_model_1.default.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getConversation = getConversation;
const getConvToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield conversation_model_1.default.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getConvToUser = getConvToUser;
