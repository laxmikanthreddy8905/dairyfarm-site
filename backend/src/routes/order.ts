import express from 'express';
const router = express.Router();

const prices = {
  milk: 50,
  curd: 40,
  paneer: 90
};

router.post('/', (req, res) => {
  const { milkQty, curdQty, paneerQty } = req.body;

  const total =
    (milkQty || 0) * prices.milk +
    (curdQty || 0) * prices.curd ;


  res.status(200).json({ total });
});

export default router;
