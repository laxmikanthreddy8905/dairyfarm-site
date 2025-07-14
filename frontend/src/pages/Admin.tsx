import React, { useState } from 'react';
import './Admin.css';

const Admin: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchData = async () => {
    const bookingRes = await fetch('https://your-backend.onrender.com/api/bookings');
    const feedbackRes = await fetch('https://your-backend.onrender.com/api/contact');
    const orderRes = await fetch('https://your-backend.onrender.com/api/orders');

    setBookings(await bookingRes.json());
    setFeedbacks(await feedbackRes.json());
    setOrders(await orderRes.json());
  };

  const handleLogin = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
      fetchData();
    } else {
      alert('Wrong password!');
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Bookings</h2>
        <ul>
          {bookings.map((b: any, i) => (
            <li key={i}>{b.name} - {b.date} at {b.time}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Feedbacks</h2>
        <ul>
          {feedbacks.map((f: any, i) => (
            <li key={i}>{f.name}: {f.rating}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map((o: any, i) => (
            <li key={i}>{o.name} - {o.quantity}L - ₹{o.total}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
