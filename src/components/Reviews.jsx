import React from 'react';
import { BsStarFill } from 'react-icons/bs';

function Reviews({ onLoginClick, isLoggedIn }) {
  const reviews = [
    {
      name: "Hanna M.",
      text: "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers."
    },
    {
      name: "David B.",
      text: "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive."
    },
    {
      name: "Nathan S.",
      text: "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading."
    },
    {
      name: "Ryan R.",
      text: "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content."
    }
  ];

  const renderStars = () => {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <BsStarFill key={index} />
        ))}
      </>
    );
  };

  return (
    <section id="reviews">
      <div className="row">
        <div className="container">
          <div className="section__title">What our members say</div>
          <div className="reviews__wrapper">
            {reviews.map((review, index) => (
              <div className="review" key={index}>
                <div className="review__header">
                  <div className="review__name">{review.name}</div>
                  <div className="review__stars">
                    {renderStars()}
                  </div>
                </div>
                <div className="review__body">
                  {review.text.split('<b>').map((part, i) => {
                    if (i === 0) return part;
                    const [bold, rest] = part.split('</b>');
                    return (
                      <React.Fragment key={i}>
                        <b>{bold}</b>{rest}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
