import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import SearchBar from './SearchBar';

function Navbar({ onLoginClick, onLogoClick, onLogout, isLoggedIn, userName, isDarkMode, onToggleDarkMode }) {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <ul className="nav__list--wrapper">
          {isLoggedIn ? (
            <>
              <li className="nav__list nav__list--search">
                <SearchBar />
              </li>
              <li className="nav__list nav__list--user">Welcome, {userName}!</li>
              <li className="nav__list nav__list--logout" onClick={onLogout}>Logout</li>
            </>
          ) : (
            <>
              <li className="nav__list nav__list--login" onClick={onLoginClick}>Login</li>
              <li className="nav__list nav__list--mobile">About</li>
              <li className="nav__list nav__list--mobile">Contact</li>
              <li className="nav__list nav__list--mobile">Help</li>
            </>
          )}
          <li className="nav__list nav__list--theme" onClick={onToggleDarkMode}>
            {isDarkMode ? <BsSun className="theme-icon" /> : <BsMoon className="theme-icon" />}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
