import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm("xdoqpezp");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  if (state.succeeded) {
    return (
      <div className="contact-container">
        <img
          className="contact-background"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Contact Background"
        />
        <div className="success-container">
          <p className="success-message">
            <span className="flower-icon">✨</span> 
            Thank you for reaching out! We'll get back to you soon. 
            <span className="flower-icon">✨</span>
          </p>
        </div>
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

    if (formData.name.trim() === '') {
      formErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      formErrors.name = 'Name must be at least 3 characters';
    } else if (!/^[A-Z]/.test(formData.name)) {
      formErrors.name = 'Name must start with a capital letter';
    }

    if (formData.email.trim() === '') {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (formData.message.trim() === '') {
      formErrors.message = 'Message is required';
    } else if (formData.message.length < 15) {
      formErrors.message = 'Message must be at least 15 characters';
    }

    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="contact-container">
      <img
        className="contact-background"
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        alt="Contact Background"
      />
      <div className="contact-card">
        <h1 className="contact-heading">Get in Touch</h1>
        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="name" className="input-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your name"
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="message" className="input-label">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea-field"
              placeholder="How can we help you?"
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={state.submitting}>
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
