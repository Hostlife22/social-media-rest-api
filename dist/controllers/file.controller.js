"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFile = (req, res) => {
    try {
        return res.status(200).json('File uploded successfully');
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = uploadFile;
