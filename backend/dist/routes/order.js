"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prices = {
    milk: 50,
    curd: 40,
    paneer: 90
};
router.post('/', (req, res) => {
    const { milkQty, curdQty, paneerQty } = req.body;
    const total = (milkQty || 0) * prices.milk +
        (curdQty || 0) * prices.curd;
    res.status(200).json({ total });
});
exports.default = router;
