import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Numbers from './components/Numbers';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Sidebar from './components/Sidebar';
import ForYouPage from './components/ForYouPage';
import BookPage from './components/BookPage';
import ChoosePlanPage from './components/ChoosePlanPage';
import SettingsPage from './components/SettingsPage';
import SearchBar from './components/SearchBar';
import HelpSupportPage from './components/HelpSupportPage';
import SearchPage from './components/SearchPage';
import PlayerPage from './components/PlayerPage';
import LibraryPage from './components/LibraryPage';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);

  const handleSaveBook = (book) => {
    setSavedBooks(prev => {
      const isAlreadySaved = prev.some(b => b.id === book.id);
      if (isAlreadySaved) {
        return prev.filter(b => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  const handleRemoveBook = (bookId) => {
    setSavedBooks(prev => prev.filter(b => b.id !== bookId));
  };

  const isBookSaved = (bookId) => {
    return savedBooks.some(b => b.id === bookId);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentPage('for-you');
    closeLoginModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToForYou = () => {
    setCurrentPage('for-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBook = (bookId) => {
    setCurrentPage(`book-${bookId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToChoosePlan = () => {
    setCurrentPage('choose-plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSettings = () => {
    setCurrentPage('settings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLibrary = () => {
    setCurrentPage('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHelp = () => {
    setCurrentPage('help');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSearch = () => {
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPlayer = (bookId) => {
    setCurrentPage(`player-${bookId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {isLoggedIn && <Sidebar onLogout={handleLogout} onNavigateForYou={navigateToForYou} onNavigateSettings={navigateToSettings} onNavigateLibrary={navigateToLibrary} onNavigateHelp={navigateToHelp} onNavigateSearch={navigateToSearch} onLogoClick={handleLogoClick} />}
      <div className={isLoggedIn ? "main-content main-content--with-sidebar" : "main-content"}>
        {currentPage === 'home' ? (
          <>
            <Navbar 
              onLoginClick={openLoginModal} 
              onLogoClick={handleLogoClick}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              userName={userName}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <Landing 
              onLoginClick={openLoginModal}
              isLoggedIn={isLoggedIn}
              userName={userName}
            />
            <Features />
            <Reviews onLoginClick={openLoginModal} isLoggedIn={isLoggedIn} />
            <Numbers />
            <Footer />
          </>
        ) : currentPage === 'for-you' ? (
          <ForYouPage onBookClick={navigateToBook} onPlayClick={navigateToPlayer} />
        ) : currentPage === 'choose-plan' ? (
          <ChoosePlanPage />
        ) : currentPage === 'settings' ? (
          <SettingsPage userName={userName} userEmail={userName ? `${userName.toLowerCase()}@example.com` : ''} />
        ) : currentPage === 'library' ? (
          <LibraryPage savedBooks={savedBooks} onBookClick={navigateToBook} onRemoveBook={handleRemoveBook} />
        ) : currentPage === 'help' ? (
          <HelpSupportPage userName={userName} userEmail={userName ? `${userName.toLowerCase()}@example.com` : ''} />
        ) : currentPage === 'search' ? (
          <SearchPage onBookClick={navigateToBook} />
        ) : currentPage.startsWith('book-') ? (
          <BookPage bookId={currentPage.replace('book-', '')} onSaveBook={handleSaveBook} isBookSaved={isBookSaved} />
        ) : currentPage.startsWith('player-') ? (
          <PlayerPage bookId={currentPage.replace('player-', '')} />
        ) : null}
      </div>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
