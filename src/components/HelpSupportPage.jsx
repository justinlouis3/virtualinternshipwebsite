import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai';
import './HelpSupportPage.css';

function HelpSupportPage({ userName, userEmail }) {
  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(`Support Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:support@summarist.com?subject=${subject}&body=${body}`;
    
    // Create temporary link and click it
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('');
      setFormData({
        name: userName || '',
        email: userEmail || '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="help-support-page">
      <div className="help-support__container">
        <h1 className="help-support__title">Help & Support</h1>
        <p className="help-support__subtitle">
          Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.
        </p>

        <form className="help-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <AiOutlineUser className="form-label__icon" />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <AiOutlineMail className="form-label__icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <AiOutlineMessage className="form-label__icon" />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Describe your issue or question..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {submitStatus === 'success' && (
            <div className="submit-message submit-message--success">
              ✓ Opening your email client...
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="submit-message submit-message--error">
              ✗ Please fill in all fields
            </div>
          )}

          <button type="submit" className="btn help-submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelpSupportPage;
