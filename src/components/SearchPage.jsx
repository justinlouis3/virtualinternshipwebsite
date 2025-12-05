import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchPage.css';

function SearchPage({ onBookClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-page__container">
        <h1 className="search-page__title">Search Books</h1>
        <p className="search-page__subtitle">
          Search for book summaries by title or author
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <AiOutlineSearch className="search-input__icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Enter book title or author..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Searching...</p>
          </div>
        )}

        {hasSearched && !isLoading && (
          <div className="search-results">
            <h2 className="search-results__title">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`
                : 'No results found'}
            </h2>

            {searchResults.length > 0 ? (
              <div className="search-results__grid">
                {searchResults.map(book => (
                  <div 
                    key={book.id} 
                    className="search-book-card"
                    onClick={() => onBookClick(book.id)}
                  >
                    <div className="search-book-card__cover">
                      <img src={book.imageLink} alt={book.title} />
                    </div>
                    <div className="search-book-card__info">
                      <h3 className="search-book-card__title">{book.title}</h3>
                      <p className="search-book-card__author">{book.author}</p>
                      <div className="search-book-card__rating">
                        ⭐ {book.averageRating || 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-results__empty">
                <p>Try searching for a different book or author</p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="search-suggestions">
            <h3 className="search-suggestions__title">Popular Searches</h3>
            <div className="search-suggestions__tags">
              <button className="search-tag" onClick={() => { setSearchQuery('Atomic Habits'); }}>
                Atomic Habits
              </button>
              <button className="search-tag" onClick={() => { setSearchQuery('Think and Grow Rich'); }}>
                Think and Grow Rich
              </button>
              <button className="search-tag" onClick={() => { setSearchQuery('Deep Work'); }}>
                Deep Work
              </button>
              <button className="search-tag" onClick={() => { setSearchQuery('Robin Sharma'); }}>
                Robin Sharma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
