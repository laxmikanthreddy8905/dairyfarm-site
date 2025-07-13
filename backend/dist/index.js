"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Check if server works
app.get('/', (_req, res) => {
    res.send('Backend is working!');
});
// ✅ Booking route
app.post('/api/booking', (req, res) => {
    const booking = req.body;
    console.log("✅ Received booking:", booking);
    res.status(200).json({ message: 'Booking received!' });
});
// ✅ Feedback route
app.post('/api/feedback', (req, res) => {
    const feedback = req.body;
    console.log("✅ Feedback:", feedback);
    res.status(200).json({ message: 'Feedback received!' });
});
// ✅ Order route
app.post('/api/order', (req, res) => {
    const { milkQty, curdQty } = req.body;
    const milkPrice = 50;
    const curdPrice = 40;
    const total = (milkQty || 0) * milkPrice + (curdQty || 0) * curdPrice;
    console.log('✅ Order Received:', { milkQty, curdQty, total });
    res.status(200).json({ total });
});
app.post('/api/home', (req, res) => {
    const { name, phone, address } = req.body;
    console.log('✅ Home Form Submitted:', { name, phone, address });
    res.status(200).json({ message: 'Home form received!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
