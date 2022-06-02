"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = __importDefault(require("../controllers/file.controller"));
const file_services_1 = __importDefault(require("../services/file.services"));
const router = (0, express_1.Router)();
router.post('/', file_services_1.default.single('file'), file_controller_1.default);
exports.default = router;
