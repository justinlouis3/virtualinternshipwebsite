import React from 'react';

function Landing({ onLoginClick, isLoggedIn, userName }) {
  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              {isLoggedIn ? (
                <>
                  <div className="landing__content__title">
                    Welcome back, {userName}! <br className="remove--tablet" />
                    Continue your learning journey
                  </div>
                  <div className="landing__content__subtitle">
                    You're logged in and ready to explore thousands of book summaries.
                    <br className="remove--tablet" />
                    Start reading now and expand your knowledge!
                  </div>
                </>
              ) : (
                <>
                  <div className="landing__content__title">
                    Gain more knowledge <br className="remove--tablet" />
                    in less time
                  </div>
                  <div className="landing__content__subtitle">
                    Great summaries for busy people,
                    <br className="remove--tablet" />
                    individuals who barely have time to read,
                    <br className="remove--tablet" />
                    and even people who don't like to read.
                  </div>
                </>
              )}
            </div>
            {!isLoggedIn && (
              <figure className="landing__image--mask">
                <img src="/assets/landing.png" alt="landing" />
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
