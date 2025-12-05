import React from 'react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { BiBook, BiHelpCircle } from 'react-icons/bi';
import { BsBookmark, BsPen } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';
import './Sidebar.css';

function Sidebar({ onLogout, onNavigateForYou, onNavigateSettings, onLogoClick, onNavigateLibrary, onNavigateHelp, onNavigateSearch }) {
  return (
    <div className="sidebar">
      <div className="sidebar__logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/assets/logo.png" alt="Summarist Logo" />
      </div>
      
      <nav className="sidebar__nav">
        <div 
          className="sidebar__link sidebar__link--active"
          onClick={onNavigateForYou}
        >
          <AiOutlineHome className="sidebar__icon" />
          <span>For You</span>
        </div>

        <div 
          className="sidebar__link"
          onClick={onNavigateLibrary}
        >
          <BiBook className="sidebar__icon" />
          <span>Library</span>
        </div>

        <div className="sidebar__link sidebar__link--disabled">
          <BsPen className="sidebar__icon" />
          <span>Highlights</span>
        </div>

        <div className="sidebar__link" onClick={onNavigateSearch}>
          <AiOutlineSearch className="sidebar__icon" />
          <span>Search</span>
        </div>

        <div className="sidebar__divider"></div>

        <div className="sidebar__link" onClick={onNavigateSettings}>
          <FiSettings className="sidebar__icon" />
          <span>Settings</span>
        </div>

        <div className="sidebar__link" onClick={onNavigateHelp}>
          <BiHelpCircle className="sidebar__icon" />
          <span>Help & Support</span>
        </div>

        <div 
          className="sidebar__link sidebar__link--logout" 
          onClick={onLogout}
        >
          <AiOutlineLogout className="sidebar__icon" />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
