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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config(); // Load .env
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Nodemailer Transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// ✅ Booking route with email
app.post('/api/booking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, date, time, people } = req.body;
    console.log('✅ Received booking:', req.body);
    try {
        yield transporter.sendMail({
            from: `"Booking Request" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New Booking',
            html: `
        <h3>New Booking</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>People:</strong> ${people}</p>
      `,
        });
        res.status(200).json({ message: 'Booking received & email sent!' });
    }
    catch (err) {
        console.error('❌ Error sending booking email:', err);
        res.status(500).json({ message: 'Booking received but email failed!' });
    }
}));
// ✅ Order route with email
app.post('/api/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, milkQty, curdQty } = req.body;
    const milkPrice = 50;
    const curdPrice = 40;
    const total = (milkQty || 0) * milkPrice + (curdQty || 0) * curdPrice;
    console.log('✅ Order Received:', { name, phone, milkQty, curdQty, total });
    try {
        yield transporter.sendMail({
            from: `"Product Order" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New Order',
            html: `
        <h3>New Product Order</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Milk:</strong> ${milkQty} L</p>
        <p><strong>Curd:</strong> ${curdQty} L</p>
        <p><strong>Total:</strong> ₹${total}</p>
      `,
        });
        res.status(200).json({ total, message: 'Order received & email sent!' });
    }
    catch (err) {
        console.error('❌ Error sending order email:', err);
        res.status(500).json({ message: 'Order received but email failed!' });
    }
}));
// ✅ Home form route with email
app.post('/api/home', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address } = req.body;
    console.log('✅ Home Form Submitted:', req.body);
    try {
        yield transporter.sendMail({
            from: `"Home Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New Home Form Submission',
            html: `
        <h3>New Home Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
      `,
        });
        res.status(200).json({ message: 'Home form received & email sent!' });
    }
    catch (err) {
        console.error('❌ Error sending home form email:', err);
        res.status(500).json({ message: 'Form received but email failed!' });
    }
}));
// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
