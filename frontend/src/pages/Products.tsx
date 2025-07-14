import React, { useState, useEffect } from 'react';
import './Products.css';

const Products: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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
    if (!name || !phone || milkQty === 0 && curdQty === 0) {
      alert('Please fill all fields and select quantity.');
      return;
    }

    try {
      const res = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, milkQty, curdQty }),
      });

      const data = await res.json();
      if (res.ok) {
        setTotal(data.total);
        setOrderPlaced(true);
        setName('');
        setPhone('');
        setMilkQty(0);
        setCurdQty(0);
      } else {
        alert('Order failed!');
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="products-container">
      <div className="products-content">
        <h1>Order Our Products</h1>

        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

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
