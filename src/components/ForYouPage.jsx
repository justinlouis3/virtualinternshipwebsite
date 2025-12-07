import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import './ForYouPage.css';

function ForYouPage({ onBookClick, onPlayClick }) {
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to format reading time from seconds
  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '3-min';
    const minutes = Math.ceil(seconds / 60);
    return `${minutes}-min`;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected'),
          fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended'),
          fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested')
        ]);

        const selectedData = await selectedRes.json();
        const recommendedData = await recommendedRes.json();
        const suggestedData = await suggestedRes.json();

        setSelectedBook(selectedData[0]);
        setRecommendedBooks(recommendedData);
        setSuggestedBooks(suggestedData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="for-you">
        <div className="for-you__container">
          <Skeleton width="200px" height="40px" className="skeleton--text" />
          
          <section className="for-you__section">
            <Skeleton width="150px" height="30px" className="skeleton--text" />
            <div className="selected-book">
              <div className="selected-book__content">
                <Skeleton width="120px" height="20px" className="skeleton--text" />
                <Skeleton width="250px" height="32px" className="skeleton--text" />
                <Skeleton width="180px" height="20px" className="skeleton--text" />
                <Skeleton width="100%" height="16px" className="skeleton--text" />
                <Skeleton width="100%" height="16px" className="skeleton--text" />
                <div style={{ display: 'flex', gap: '16px', margin: '16px 0' }}>
                  <Skeleton width="100px" height="24px" />
                  <Skeleton width="100px" height="24px" />
                </div>
                <Skeleton width="180px" height="40px" borderRadius="4px" />
              </div>
              <div className="selected-book__image">
                <Skeleton width="100%" height="100%" borderRadius="8px" />
              </div>
            </div>
          </section>

          <section className="for-you__section">
            <Skeleton width="200px" height="30px" className="skeleton--text" />
            <div className="books-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="book-card" key={i}>
                  <Skeleton width="100%" height="200px" borderRadius="8px" className="skeleton--text" />
                  <Skeleton width="80%" height="20px" className="skeleton--text" />
                  <Skeleton width="60%" height="16px" className="skeleton--text" />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton width="70px" height="16px" />
                    <Skeleton width="60px" height="16px" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="for-you__section">
            <Skeleton width="200px" height="30px" className="skeleton--text" />
            <div className="books-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="book-card" key={i}>
                  <Skeleton width="100%" height="200px" borderRadius="8px" className="skeleton--text" />
                  <Skeleton width="80%" height="20px" className="skeleton--text" />
                  <Skeleton width="60%" height="16px" className="skeleton--text" />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton width="70px" height="16px" />
                    <Skeleton width="60px" height="16px" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="for-you">
        <div className="for-you__container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="for-you">
      <div className="for-you__container">
        <h1 className="for-you__title">For You</h1>
        
        {selectedBook && (
          <section className="for-you__section">
            <h2 className="for-you__section-title">Selected Book</h2>
            <div className="selected-book">
              <div className="selected-book__content">
                <div className="selected-book__label">{selectedBook.subTitle || 'Book of the Day'}</div>
                <h3 className="selected-book__title">{selectedBook.title}</h3>
                <p className="selected-book__author">{selectedBook.author}</p>
                <p className="selected-book__subtitle">
                  {selectedBook.subTitle}
                </p>
                <div className="selected-book__stats">
                  <div className="book-stat">
                    <div className="book-stat__icon">⏱️</div>
                    <div className="book-stat__text">{formatTime(selectedBook.audioLength || selectedBook.bookLength)} read</div>
                  </div>
                  <div className="book-stat">
                    <div className="book-stat__icon">⭐</div>
                    <div className="book-stat__text">{selectedBook.averageRating ? selectedBook.averageRating.toFixed(1) : 'N/A'}</div>
                  </div>
                </div>
                <div className="selected-book__actions">
                  <button className="btn selected-book__btn" onClick={() => onBookClick(selectedBook.id)}>Read Now</button>
                  <button 
                    className="btn selected-book__btn selected-book__btn--listen" 
                    onClick={() => {
                      console.log('Listen button clicked for book ID:', selectedBook.id);
                      if (onPlayClick) {
                        onPlayClick(selectedBook.id);
                      } else {
                        console.error('onPlayClick is not defined');
                      }
                    }}
                  >
                    Listen
                  </button>
                </div>
              </div>
              <div className="selected-book__image" onClick={() => onBookClick(selectedBook.id)} style={{ cursor: 'pointer' }}>
                <img src={selectedBook.imageLink} alt={selectedBook.title} />
              </div>
            </div>
          </section>
        )}

        <section className="for-you__section">
          <h2 className="for-you__section-title">Recommended Books</h2>
          <div className="books-grid">
            {recommendedBooks.map((book) => (
              <div className="book-card" key={book.id} onClick={() => onBookClick(book.id)}>
                <div className="book-card__image">
                  <img src={book.imageLink} alt={book.title} />
                  <div className="book-pill">Recommended</div>
                </div>
                <div className="book-card__content">
                  <h4 className="book-card__title">{book.title}</h4>
                  <p className="book-card__author">{book.author}</p>
                  <div className="book-card__footer">
                    <span className="book-card__time">⏱️ {formatTime(book.audioLength || book.bookLength)}</span>
                    <span className="book-card__rating">⭐ {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="for-you__section">
          <h2 className="for-you__section-title">Suggested Books</h2>
          <div className="books-grid">
            {suggestedBooks.map((book) => (
              <div className="book-card" key={book.id} onClick={() => onBookClick(book.id)}>
                <div className="book-card__image">
                  <img src={book.imageLink} alt={book.title} />
                  <div className="book-pill book-pill--trending">Suggested</div>
                </div>
                <div className="book-card__content">
                  <h4 className="book-card__title">{book.title}</h4>
                  <p className="book-card__author">{book.author}</p>
                  <div className="book-card__footer">
                    <span className="book-card__time">⏱️ {formatTime(book.audioLength || book.bookLength)}</span>
                    <span className="book-card__rating">⭐ {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForYouPage;
