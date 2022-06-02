"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controller_1 = require("../controllers/conversation.controller");
const router = (0, express_1.Router)();
router.post('/', conversation_controller_1.newConversation);
router.get('/:userId', conversation_controller_1.getConversation);
router.get('/find/:firstUserId/:secondUserId', conversation_controller_1.getConvToUser);
exports.default = router;
