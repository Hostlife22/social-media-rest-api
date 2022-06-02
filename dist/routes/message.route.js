"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.post('/', message_controller_1.addMessage);
router.get('/:conversationId', message_controller_1.getMessage);
exports.default = router;
