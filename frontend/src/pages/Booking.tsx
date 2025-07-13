import React, { useState } from 'react';
import './Booking.css';

const Booking: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [booked, setBooked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !date || !time) {
      alert('Please fill out all fields.');
      return;
    }

    const bookingData = { name, date, time };

    try {
      const response = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBooked(true);
        console.log('Booking submitted:', bookingData);
      } else {
        alert('Failed to submit booking.');
      }
    } catch (error) {
      console.error('Error:', error);
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
