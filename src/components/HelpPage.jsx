import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import './HelpPage.css';

function HelpPage({ userName, userEmail }) {
  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate sending email
    setTimeout(() => {
      // Create mailto link to open default email client
      const subject = encodeURIComponent('Help & Support Request from Summarist');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:support@summarist.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ ...formData, message: '' });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="help-page">
      <div className="help-page__container">
        <h1 className="help-page__title">Help & Support</h1>
        <p className="help-page__subtitle">
          Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.
        </p>

        <div className="help-content">
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="6"
                required
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-message form-message--success">
                ✓ Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message form-message--error">
                ✗ There was an error sending your message. Please try again.
              </div>
            )}

            <button 
              type="submit" 
              className="btn help-form__btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>

          <div className="help-info">
            <h2 className="help-info__title">Other Ways to Reach Us</h2>
            
            <div className="help-info__item">
              <AiOutlineMail className="help-info__icon" />
              <div>
                <h3 className="help-info__label">Email</h3>
                <p className="help-info__text">support@summarist.com</p>
              </div>
            </div>

            <div className="help-info__item">
              <BiHelpCircle className="help-info__icon" />
              <div>
                <h3 className="help-info__label">FAQ</h3>
                <p className="help-info__text">Check our frequently asked questions for quick answers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
