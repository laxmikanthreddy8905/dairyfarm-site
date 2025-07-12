import express from 'express';
const router = express.Router();

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


export default router;
            