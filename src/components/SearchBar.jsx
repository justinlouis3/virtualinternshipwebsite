import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.css';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger a search function
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <AiOutlineSearch className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
