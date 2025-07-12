import React, { useState, useEffect } from 'react';
import './Products.css';

const Products: React.FC = () => {
  const [milkQty, setMilkQty] = useState(0);
  const [curdQty, setCurdQty] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const milkPrice = 50;
    const curdPrice = 40;
    const calculatedTotal = milkQty * milkPrice + curdQty * curdPrice;
    setTotal(calculatedTotal);
  }, [milkQty, curdQty]);

  const handleOrder = async () => {
    const res = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ milkQty, curdQty }),
    });

    if (res.ok) {
      const data = await res.json();
      setTotal(data.total);
      setOrderPlaced(true);
    } else {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="products-container">
      <div className="products-content">
        <h1>Order Our Products</h1>
        <div className="form-group">
          <label>Milk (₹50/litre):</label>
          <input
            type="number"
            min="0"
            value={milkQty}
            onChange={(e) => setMilkQty(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Curd (₹40/kg):</label>
          <input
            type="number"
            min="0"
            value={curdQty}
            onChange={(e) => setCurdQty(Number(e.target.value))}
          />
        </div>

        <h3>Total: ₹{total}</h3>

        <button className="order-button" onClick={handleOrder}>
          Place Order
        </button>

        {orderPlaced && <p className="success-msg">✅ Order Placed Successfully!</p>}
      </div>
    </div>
  );
};

export default Products;
