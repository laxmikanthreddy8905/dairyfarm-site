"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = [
    { id: 1, name: 'Milk', price: 50 },
    { id: 2, name: 'Curd', price: 40 },
];
router.get('/', (_req, res) => {
    res.status(200).json(products);
});
exports.default = router;
