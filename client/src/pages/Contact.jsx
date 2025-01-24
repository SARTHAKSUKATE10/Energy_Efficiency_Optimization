import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm("xdoqpezp"); // Replace with your Formspree form ID
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  if (state.succeeded) {
    return (
      <div className="success-container">
        <p className="success-message">
          <span className="flower-icon">🌸</span> Thanks for your message! <span className="flower-icon">🌼</span>
        </p>
      </div>
    );
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = { name: '', email: '', message: '' };

    // Name validation
    if (formData.name.trim() === '') {
      formErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      formErrors.name = 'Name must be at least 3 characters';
    } else if (!/^[A-Z]/.test(formData.name)) {
      formErrors.name = 'Name must start with a capital letter';
    }

    // Email validation
    if (formData.email.trim() === '') {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email must be a valid email address';
    }

    // Message validation
    if (formData.message.trim() === '') {
      formErrors.message = 'Message is required';
    } else if (formData.message.length < 15) {
      formErrors.message = 'Message must be at least 15 characters';
    }

    setErrors(formErrors);

    // Return true if no errors
    return !Object.values(formErrors).some((error) => error);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    if (validateForm()) {
      handleSubmit(e); // Ensure handleSubmit is properly triggered with event object
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-heading">Contact Us</h1>
        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="name" className="input-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="message" className="input-label">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea-field"
              rows="4"
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <div className="button-center">
            <button type="submit" className="submit-button" disabled={state.submitting}>
              {state.submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;



