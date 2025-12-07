import React, { useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Skeleton from './Skeleton';
import './ChoosePlanPage.css';

function ChoosePlanPage({ onUpgrade }) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading pricing data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleSubscribe = (plan) => {
    // In a real app, this would integrate with Stripe or payment processor
    // For now, we'll just upgrade the user to premium
    if (onUpgrade) {
      onUpgrade();
      alert(`Successfully upgraded to ${plan}!\n\nYou now have unlimited access to all premium features.`);
    } else {
      alert(`Subscribing to ${plan} plan!\n\nIn a production app, this would redirect to payment processing.`);
    }
  };

  if (loading) {
    return (
      <div className="choose-plan">
        <div className="choose-plan__container">
          <div className="choose-plan__header">
            <Skeleton width="60%" height="48px" className="skeleton--text" style={{ margin: '0 auto' }} />
            <Skeleton width="50%" height="20px" className="skeleton--text" style={{ margin: '16px auto' }} />
            <div className="choose-plan__image" style={{ maxWidth: '400px', margin: '32px auto' }}>
              <Skeleton width="100%" height="250px" borderRadius="8px" />
            </div>
          </div>

          {/* Skeleton Plan Toggle */}
          <div className="plan-toggle" style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '32px 0' }}>
            <Skeleton width="120px" height="48px" borderRadius="24px" />
            <Skeleton width="120px" height="48px" borderRadius="24px" />
          </div>

          {/* Skeleton Pricing Cards */}
          <div className="pricing-cards">
            {[1, 2].map((i) => (
              <div key={i} className="pricing-card">
                <Skeleton width="150px" height="24px" className="skeleton--text" />
                <Skeleton width="100px" height="48px" className="skeleton--text" />
                <Skeleton width="80%" height="16px" className="skeleton--text" />
                <div style={{ marginTop: '24px' }}>
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} width="100%" height="20px" className="skeleton--text" />
                  ))}
                </div>
                <Skeleton width="100%" height="48px" borderRadius="4px" style={{ marginTop: '24px' }} />
              </div>
            ))}
          </div>

          {/* Skeleton Benefits */}
          <div style={{ margin: '48px 0' }}>
            <Skeleton width="250px" height="32px" className="skeleton--text" style={{ margin: '0 auto' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton width="48px" height="48px" borderRadius="50%" className="skeleton--text" />
                  <Skeleton width="100%" height="20px" className="skeleton--text" />
                  <Skeleton width="90%" height="16px" className="skeleton--text" />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton FAQ */}
          <div style={{ margin: '48px 0' }}>
            <Skeleton width="200px" height="32px" className="skeleton--text" style={{ margin: '0 auto' }} />
            <div style={{ marginTop: '24px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <Skeleton width="100%" height="24px" className="skeleton--text" />
                  <Skeleton width="100%" height="16px" className="skeleton--text" />
                  <Skeleton width="95%" height="16px" className="skeleton--text" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="choose-plan">
      <div className="choose-plan__container">
        <div className="choose-plan__header">
          <h1 className="choose-plan__title">
            Get unlimited access to many amazing books to read
          </h1>
          <p className="choose-plan__subtitle">
            Turn ordinary moments into amazing learning opportunities
          </p>
          <div className="choose-plan__image">
            <img src="/assets/pricing-top.png" alt="Pricing" />
          </div>
        </div>

        {/* Plan Toggle */}
        <div className="plan-toggle">
          <button
            className={`plan-toggle__btn ${selectedPlan === 'yearly' ? 'plan-toggle__btn--active' : ''}`}
            onClick={() => setSelectedPlan('yearly')}
          >
            Yearly
          </button>
          <button
            className={`plan-toggle__btn ${selectedPlan === 'monthly' ? 'plan-toggle__btn--active' : ''}`}
            onClick={() => setSelectedPlan('monthly')}
          >
            Monthly
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {/* Premium Plus Plan */}
          <div className="pricing-card pricing-card--featured">
            <div className="pricing-card__badge">Most Popular</div>
            <div className="pricing-card__header">
              <h3 className="pricing-card__name">Premium Plus</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">
                  ${selectedPlan === 'yearly' ? '99.99' : '9.99'}
                </span>
                <span className="pricing-card__period">
                  /{selectedPlan === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="pricing-card__savings">Save 50% with annual plan</div>
              )}
            </div>

            <ul className="pricing-card__features">
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Unlimited book summaries</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Unlimited audio summaries</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Access to all premium content</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Offline reading mode</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Personalized recommendations</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Ad-free experience</span>
              </li>
            </ul>

            <button
              className="btn pricing-card__btn pricing-card__btn--featured"
              onClick={() => handleSubscribe(selectedPlan === 'yearly' ? 'Premium Plus Yearly' : 'Premium Plus Monthly')}
            >
              Start {selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="pricing-card">
            <div className="pricing-card__header">
              <h3 className="pricing-card__name">Premium</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">
                  ${selectedPlan === 'yearly' ? '79.99' : '7.99'}
                </span>
                <span className="pricing-card__period">
                  /{selectedPlan === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="pricing-card__savings">Save 40% with annual plan</div>
              )}
            </div>

            <ul className="pricing-card__features">
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Unlimited book summaries</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Access to most content</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Offline reading mode</span>
              </li>
              <li className="pricing-feature">
                <AiOutlineCheck className="pricing-feature__icon" />
                <span>Basic recommendations</span>
              </li>
            </ul>

            <button
              className="btn pricing-card__btn"
              onClick={() => handleSubscribe(selectedPlan === 'yearly' ? 'Premium Yearly' : 'Premium Monthly')}
            >
              Start {selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Plan
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="plan-features">
          <h2 className="plan-features__title">
            What you'll get with Premium
          </h2>
          <div className="plan-features__grid">
            <div className="feature-box">
              <div className="feature-box__icon">📚</div>
              <h3 className="feature-box__title">10,000+ Books</h3>
              <p className="feature-box__text">
                Access thousands of book summaries across various genres and topics
              </p>
            </div>
            <div className="feature-box">
              <div className="feature-box__icon">🎧</div>
              <h3 className="feature-box__title">Audio Summaries</h3>
              <p className="feature-box__text">
                Listen to summaries on the go with high-quality audio narration
              </p>
            </div>
            <div className="feature-box">
              <div className="feature-box__icon">📱</div>
              <h3 className="feature-box__title">Offline Access</h3>
              <p className="feature-box__text">
                Download summaries and read them anywhere, anytime without internet
              </p>
            </div>
            <div className="feature-box">
              <div className="feature-box__icon">✨</div>
              <h3 className="feature-box__title">New Content Daily</h3>
              <p className="feature-box__text">
                Fresh book summaries added every day from the latest bestsellers
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="plan-faq">
          <h2 className="plan-faq__title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 className="faq-question">Can I cancel anytime?</h3>
              <p className="faq-answer">
                Yes! You can cancel your subscription at any time from your account settings. No questions asked.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Is there a free trial?</h3>
              <p className="faq-answer">
                Yes, we offer a 7-day free trial for all new users. Try Summarist risk-free!
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What payment methods do you accept?</h3>
              <p className="faq-answer">
                We accept all major credit cards, PayPal, and Apple Pay for your convenience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="plan-cta">
          <h2 className="plan-cta__title">Start your learning journey today</h2>
          <p className="plan-cta__text">
            Join thousands of readers who are already growing with Summarist
          </p>
          <button
            className="btn plan-cta__btn"
            onClick={() => handleSubscribe('Premium Plus')}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChoosePlanPage;
