// src/pages/Booking.tsx
import React, { useState } from 'react';
import './Booking.css';

const Booking: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [booked, setBooked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !time || !people) {
      alert('Please fill out all fields.');
      return;
    }

    const bookingData = { name, phone, date, time, people };

    try {
      const res = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        setBooked(true);
        setName('');
        setPhone('');
        setDate('');
        setTime('');
        setPeople('');
      } else {
        alert('Booking failed!');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-content">
        <h1>Book a Farm Visit</h1>
        <form className="booking-form" onSubmit={handleSubmit}>
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
            <label>Your Phone:</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Time:</label>
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">--Select Time--</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of People:</label>
            <input
              type="number"
              placeholder="e.g. 4"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="booking-button">
            Book Now
          </button>
        </form>

        {booked && (
          <div className="success-message">
            <p>✅ Booking Confirmed!</p>
            <p>
              <strong>{name}</strong>, your visit is booked for <strong>{date}</strong> at{' '}
              <strong>{time}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
