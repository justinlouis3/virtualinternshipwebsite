import React from 'react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { BiBook, BiHelpCircle } from 'react-icons/bi';
import { BsBookmark, BsPen } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, onLogout, onNavigateForYou, onNavigateSettings, onLogoClick, onNavigateLibrary, onNavigateHelp, onNavigateSearch }) {
  const handleNavigation = (callback) => {
    callback();
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <button className="sidebar__close" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <div className="sidebar__logo" onClick={() => handleNavigation(onLogoClick)} style={{ cursor: 'pointer' }}>
          <img src="/assets/logo.png" alt="Summarist Logo" />
        </div>
      
      <nav className="sidebar__nav">
        <div 
          className="sidebar__link sidebar__link--active"
          onClick={() => handleNavigation(onNavigateForYou)}
        >
          <AiOutlineHome className="sidebar__icon" />
          <span>For You</span>
        </div>

        <div 
          className="sidebar__link"
          onClick={() => handleNavigation(onNavigateLibrary)}
        >
          <BiBook className="sidebar__icon" />
          <span>Library</span>
        </div>

        <div className="sidebar__link sidebar__link--disabled">
          <BsPen className="sidebar__icon" />
          <span>Highlights</span>
        </div>

        <div className="sidebar__link" onClick={() => handleNavigation(onNavigateSearch)}>
          <AiOutlineSearch className="sidebar__icon" />
          <span>Search</span>
        </div>

        <div className="sidebar__divider"></div>

        <div className="sidebar__link" onClick={() => handleNavigation(onNavigateSettings)}>
          <FiSettings className="sidebar__icon" />
          <span>Settings</span>
        </div>

        <div className="sidebar__link" onClick={() => handleNavigation(onNavigateHelp)}>
          <BiHelpCircle className="sidebar__icon" />
          <span>Help & Support</span>
        </div>

        <div 
          className="sidebar__link sidebar__link--logout" 
          onClick={() => handleNavigation(onLogout)}
        >
          <AiOutlineLogout className="sidebar__icon" />
          <span>Logout</span>
        </div>
      </nav>
      </div>
    </>
  );
}

export default Sidebar;
