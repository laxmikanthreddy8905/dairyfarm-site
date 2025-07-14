import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message || !feedback) {
      alert('Please fill all fields and select a feedback option.');
      return;
    }

    try {
      // 1️⃣ Send feedback to backend
      const feedbackRes = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, rating: feedback }),
      });

      // 2️⃣ Send email to Gmail
      const emailRes = await fetch('https://dairyfarm-backend-27wu.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (feedbackRes.ok && emailRes.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setFeedback('');
      } else {
        alert('Something went wrong while submitting.');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Error occurred. Try again.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Message:</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rate Your Experience:</label>
            <div className="feedback-buttons">
              {['Excellent', 'Good', 'Average', 'Poor'].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`feedback-btn ${feedback === option ? 'selected' : ''}`}
                  onClick={() => setFeedback(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>

        {submitted && (
          <div className="contact-success">
            ✅ Thank you, <strong>{formData.name}</strong>!<br />
            Your feedback: <strong>{feedback}</strong><br />
            We’ll get back to you shortly.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
