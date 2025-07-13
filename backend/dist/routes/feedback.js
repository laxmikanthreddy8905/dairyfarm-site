"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const { name, rating } = req.body;
    console.log('Feedback:', { name, rating });
    res.status(200).json({ message: 'Thank you for your feedback!' });
});
// backend/src/routes/feedback.ts
router.post('/', (req, res) => {
    const { name, email, message, rating } = req.body;
    console.log('Feedback received:', { name, email, message, rating });
    res.status(200).json({ message: 'Feedback saved successfully.' });
});
exports.default = router;
