import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import './LibraryPage.css';

function LibraryPage({ savedBooks, onBookClick, onRemoveBook }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="library-page">
        <div className="library-page__container">
          <Skeleton width="200px" height="40px" className="skeleton--text" />
          
          <div className="library-stats" style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
            <Skeleton width="150px" height="80px" borderRadius="8px" />
            <Skeleton width="150px" height="80px" borderRadius="8px" />
            <Skeleton width="150px" height="80px" borderRadius="8px" />
          </div>

          <section style={{ marginTop: '48px' }}>
            <Skeleton width="180px" height="30px" className="skeleton--text" />
            <div className="books-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                  <Skeleton width="80%" height="20px" className="skeleton--text" />
                  <Skeleton width="60%" height="16px" className="skeleton--text" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="library-page">
      <div className="library-page__container">
        <h1 className="library-page__title">My Library</h1>

        <div className="library-stats">
          <div className="library-stat-card">
            <div className="library-stat-card__value">{savedBooks.length}</div>
            <div className="library-stat-card__label">Saved Books</div>
          </div>
          <div className="library-stat-card">
            <div className="library-stat-card__value">{Math.floor(savedBooks.length * 12)}</div>
            <div className="library-stat-card__label">Minutes Saved</div>
          </div>
          <div className="library-stat-card">
            <div className="library-stat-card__value">{savedBooks.length * 3}</div>
            <div className="library-stat-card__label">Key Insights</div>
          </div>
        </div>

        <section className="library-section">
          <h2 className="library-section__title">Saved Books</h2>
          
          {savedBooks.length === 0 ? (
            <div className="library-empty">
              <div className="library-empty__icon">📚</div>
              <h3 className="library-empty__title">Your library is empty</h3>
              <p className="library-empty__text">
                Start building your collection by saving books from the For You page or Search results.
              </p>
            </div>
          ) : (
            <div className="books-grid">
              {savedBooks.map((book) => (
                <div className="library-book-card" key={book.id}>
                  <div className="library-book-card__image" onClick={() => onBookClick(book.id)}>
                    <img src={book.imageLink} alt={book.title} />
                    <button 
                      className="library-book-card__remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBook(book.id);
                      }}
                      title="Remove from library"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="library-book-card__content" onClick={() => onBookClick(book.id)}>
                    <h4 className="library-book-card__title">{book.title}</h4>
                    <p className="library-book-card__author">{book.author}</p>
                    <div className="library-book-card__footer">
                      <span className="library-book-card__rating">⭐ {book.averageRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default LibraryPage;
