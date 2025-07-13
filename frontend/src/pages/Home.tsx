import React, { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert('Please fill in all fields.');
      return;
    }

    const res = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, address }),
    });

    if (res.ok) {
      setSubmitted(true);
      setName('');
      setPhone('');
      setAddress('');
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Bro's Dairy Farm</h1>
        <p>Fresh Milk • Organic Curd • Pure Paneer</p>
        <p>Quality You Can Trust. Taste You’ll Love.</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>

        {submitted && <p className="success-msg">✅ Thank you! We'll reach out soon.</p>}
      </div>
    </div>
  );
};

export default Home;
