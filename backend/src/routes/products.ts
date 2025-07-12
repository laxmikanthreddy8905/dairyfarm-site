import express from 'express';
const router = express.Router();

const products = [
  { id: 1, name: 'Milk', price: 50 },
  { id: 2, name: 'Curd', price: 40 },

];

router.get('/', (_req, res) => {
  res.status(200).json(products);
});

export default router;
