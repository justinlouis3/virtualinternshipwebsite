import React, { useState, useEffect } from 'react';
import { AiOutlineClockCircle, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiMicrophone, BiBook } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Skeleton from './Skeleton';
import './BookPage.css';

function BookPage({ bookId, onSaveBook, isBookSaved, onPlayClick }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleSaveBook = () => {
    if (book && onSaveBook) {
      onSaveBook(book);
      const wasSaved = isBookSaved(book.id);
      if (!wasSaved) {
        alert(`"${book.title}" has been saved to your library!`);
      } else {
        alert(`"${book.title}" has been removed from your library.`);
      }
    }
  };

  const isSaved = book && isBookSaved ? isBookSaved(book.id) : false;

  if (loading) {
    return (
      <div className="book-page">
        <div className="book-page__container">
          {/* Skeleton Book Header */}
          <div className="book-header">
            <div className="book-header__content">
              <div className="book-header__info">
                <Skeleton width="60%" height="40px" className="skeleton--text" />
                <Skeleton width="30%" height="20px" className="skeleton--text" />
                
                <div className="book-header__meta" style={{ display: 'flex', gap: '24px', margin: '16px 0' }}>
                  <Skeleton width="100px" height="20px" />
                  <Skeleton width="100px" height="20px" />
                  <Skeleton width="100px" height="20px" />
                </div>

                <div className="book-header__actions" style={{ display: 'flex', gap: '12px' }}>
                  <Skeleton width="120px" height="40px" borderRadius="4px" />
                  <Skeleton width="120px" height="40px" borderRadius="4px" />
                  <Skeleton width="100px" height="40px" borderRadius="4px" />
                </div>
              </div>

              <div className="book-header__cover">
                <Skeleton width="100%" height="300px" borderRadius="8px" />
              </div>
            </div>
          </div>

          {/* Skeleton Tabs */}
          <div className="book-tabs" style={{ display: 'flex', gap: '16px', margin: '32px 0' }}>
            <Skeleton width="120px" height="40px" borderRadius="4px" />
            <Skeleton width="120px" height="40px" borderRadius="4px" />
          </div>

          {/* Skeleton Content */}
          <div className="book-content">
            <Skeleton width="200px" height="32px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="95%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="90%" height="16px" className="skeleton--text" />
            <div style={{ marginTop: '24px' }}>
              <Skeleton width="100%" height="16px" className="skeleton--text" />
              <Skeleton width="100%" height="16px" className="skeleton--text" />
              <Skeleton width="85%" height="16px" className="skeleton--text" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-page">
        <div className="book-page__container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-page">
        <div className="book-page__container">
          <div className="error-message">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-page">
      <div className="book-page__container">
        {/* Book Header */}
        <div className="book-header">
          <div className="book-header__content">
            <div className="book-header__info">
              <h1 className="book-header__title">{book.title}</h1>
              <p className="book-header__author">By {book.author}</p>
              
              <div className="book-header__meta">
                <div className="book-meta">
                  <AiOutlineStar className="book-meta__icon" />
                  <span>{book.averageRating ? book.averageRating.toFixed(1) : 'N/A'} Rating</span>
                </div>
                <div className="book-meta">
                  <AiOutlineClockCircle className="book-meta__icon" />
                  <span>{book.audioLength ? Math.ceil(book.audioLength / 60) : '3'} min Read</span>
                </div>
                <div className="book-meta">
                  <BiMicrophone className="book-meta__icon" />
                  <span>{book.audioLength ? Math.ceil(book.audioLength / 60) : '3'} min Listen</span>
                </div>
              </div>

              <div className="book-header__actions">
                <button className="btn book-btn book-btn--primary">
                  <BiBook /> Read Now
                </button>
                <button 
                  className="btn book-btn book-btn--secondary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('========== LISTEN BUTTON CLICKED ==========');
                    console.log('bookId:', bookId);
                    console.log('book object:', book);
                    console.log('onPlayClick exists?', !!onPlayClick);
                    console.log('onPlayClick function:', onPlayClick);
                    
                    if (onPlayClick && bookId) {
                      console.log('✅ Calling onPlayClick with bookId:', bookId);
                      try {
                        onPlayClick(bookId);
                        console.log('✅ onPlayClick called successfully');
                      } catch (error) {
                        console.error('❌ Error calling onPlayClick:', error);
                      }
                    } else {
                      console.error('❌ Missing required data:', { 
                        hasOnPlayClick: !!onPlayClick, 
                        bookId: bookId 
                      });
                      alert('Unable to play audio. Check console for details.');
                    }
                    console.log('========================================');
                  }}
                  style={{ 
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: 10,
                    position: 'relative'
                  }}
                >
                  <BiMicrophone /> Listen
                </button>
                <button 
                  className={`btn book-btn book-btn--save ${isSaved ? 'book-btn--saved' : ''}`}
                  onClick={handleSaveBook}
                >
                  {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <div className="book-header__cover">
              <img src={book.imageLink} alt={book.title} />
            </div>
          </div>
        </div>

        {/* Book Tabs */}
        <div className="book-tabs">
          <button 
            className={`book-tab ${activeTab === 'summary' ? 'book-tab--active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={`book-tab ${activeTab === 'insights' ? 'book-tab--active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Key Insights
          </button>
        </div>

        {/* Book Content */}
        <div className="book-content">
          {activeTab === 'summary' ? (
            <div className="book-summary">
              <h2 className="book-content__title">Book Summary</h2>
              <div className="book-summary__text">
                {book.summary ? (
                  book.summary.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{book.subTitle || 'No summary available for this book.'}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="book-insights">
              <h2 className="book-content__title">Key Insights</h2>
              <ul className="book-insights__list">
                {book.keyInsights ? (
                  book.keyInsights.map((insight, index) => (
                    <li key={index} className="book-insight">
                      <AiFillStar className="book-insight__icon" />
                      <span>{insight}</span>
                    </li>
                  ))
                ) : (
                  <li className="book-insight">
                    <AiFillStar className="book-insight__icon" />
                    <span>Key insights coming soon for this book.</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookPage;
