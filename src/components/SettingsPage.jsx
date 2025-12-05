import React, { useState, useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsShieldCheck } from 'react-icons/bs';
import Skeleton from './Skeleton';
import './SettingsPage.css';

function SettingsPage({ userEmail, userName }) {
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus] = useState({
    plan: 'Premium Plus'
  });

  useEffect(() => {
    // Simulate loading settings data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-page__container">
          <Skeleton width="150px" height="40px" className="skeleton--text" />

          {/* Skeleton Email */}
          <section className="settings-section">
            <Skeleton width="150px" height="28px" className="skeleton--text" />
            <div className="settings-card">
              <div className="settings-item">
                <Skeleton width="120px" height="16px" className="skeleton--text" />
                <Skeleton width="250px" height="24px" className="skeleton--text" />
              </div>
            </div>
          </section>

          {/* Skeleton Subscription */}
          <section className="settings-section">
            <Skeleton width="180px" height="28px" className="skeleton--text" />
            <div className="settings-card">
              <div className="settings-item">
                <Skeleton width="140px" height="16px" className="skeleton--text" />
                <Skeleton width="200px" height="24px" className="skeleton--text" />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-page__container">
        <h1 className="settings-page__title">Settings</h1>

        {/* Email Section */}
        <section className="settings-section">
          <h2 className="settings-section__title">
            <AiOutlineMail className="settings-section__icon" />
            Email Address
          </h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="settings-item__value">
                {userEmail || `${userName?.toLowerCase()}@example.com`}
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plan Section */}
        <section className="settings-section">
          <h2 className="settings-section__title">
            <BsShieldCheck className="settings-section__icon" />
            Subscription Plan
          </h2>
          <div className="settings-card">
            <div className="settings-item">
              <div className="settings-item__value">{subscriptionStatus.plan}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;
