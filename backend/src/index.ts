import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); // Load .env

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Booking route with email
app.post('/api/booking', async (req: Request, res: Response) => {
  const { name, phone, date, time, people } = req.body;

  console.log('✅ Received booking:', req.body);

  try {
    await transporter.sendMail({
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
  } catch (err) {
    console.error('❌ Error sending booking email:', err);
    res.status(500).json({ message: 'Booking received but email failed!' });
  }
});

// ✅ Order route with email
app.post('/api/order', async (req: Request, res: Response) => {
  const { name, phone, milkQty, curdQty } = req.body;

  const milkPrice = 50;
  const curdPrice = 40;
  const total = (milkQty || 0) * milkPrice + (curdQty || 0) * curdPrice;

  console.log('✅ Order Received:', { name, phone, milkQty, curdQty, total });

  try {
    await transporter.sendMail({
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
  } catch (err) {
    console.error('❌ Error sending order email:', err);
    res.status(500).json({ message: 'Order received but email failed!' });
  }
});

// ✅ Home form route with email
app.post('/api/home', async (req: Request, res: Response) => {
  const { name, phone, address } = req.body;

  console.log('✅ Home Form Submitted:', req.body);

  try {
    await transporter.sendMail({
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
  } catch (err) {
    console.error('❌ Error sending home form email:', err);
    res.status(500).json({ message: 'Form received but email failed!' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
