import { useState, useEffect } from 'react';
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
import HelpSupportPage from './components/HelpSupportPage';
import SearchPage from './components/SearchPage';
import PlayerPage from './components/PlayerPage';
import LibraryPage from './components/LibraryPage';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('free'); // 'free' or 'premium'
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(userData.name);
      setUserEmail(userData.email);
      setSubscriptionPlan(userData.subscription || 'free');
      
      // Load user's saved books
      const userBooks = localStorage.getItem(`savedBooks_${userData.email}`);
      if (userBooks) {
        setSavedBooks(JSON.parse(userBooks));
      }
      setCurrentPage('for-you');
    }
  }, []);

  const handleSaveBook = (book) => {
    setSavedBooks(prev => {
      const isAlreadySaved = prev.some(b => b.id === book.id);
      let newBooks;
      if (isAlreadySaved) {
        newBooks = prev.filter(b => b.id !== book.id);
      } else {
        newBooks = [...prev, book];
      }
      // Save to localStorage for this user
      if (userEmail) {
        const storageKey = `savedBooks_${userEmail}`;
        localStorage.setItem(storageKey, JSON.stringify(newBooks));
        console.log(`Saved books for ${userEmail}:`, newBooks.length, 'books');
        console.log(`Storage key: ${storageKey}`);
      }
      return newBooks;
    });
  };

  const handleRemoveBook = (bookId) => {
    setSavedBooks(prev => {
      const newBooks = prev.filter(b => b.id !== bookId);
      // Save to localStorage for this user
      if (userEmail) {
        localStorage.setItem(`savedBooks_${userEmail}`, JSON.stringify(newBooks));
      }
      return newBooks;
    });
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

  const handleLogin = (email, name, subscription = 'free') => {
    console.log(`Logging in user: ${email}`);
    
    setIsLoggedIn(true);
    setUserName(name);
    setUserEmail(email);
    setSubscriptionPlan(subscription);
    
    // Store user data in localStorage
    const userData = { email, name, subscription };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Load user's saved books
    const storageKey = `savedBooks_${email}`;
    const userBooks = localStorage.getItem(storageKey);
    console.log(`Loading books for ${email} from key: ${storageKey}`);
    
    if (userBooks) {
      const parsedBooks = JSON.parse(userBooks);
      console.log(`Found ${parsedBooks.length} saved books for this user`);
      setSavedBooks(parsedBooks);
    } else {
      console.log('No saved books found for this user');
      setSavedBooks([]);
    }
    
    setCurrentPage('for-you');
    closeLoginModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setSubscriptionPlan('free');
    setSavedBooks([]);
    localStorage.removeItem('currentUser');
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleUpgradeToPremium = () => {
    setSubscriptionPlan('premium');
    
    // Update user data in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      currentUser.subscription = 'premium';
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Also update in registered users
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      if (users[currentUser.email]) {
        users[currentUser.email].subscription = 'premium';
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    }
    
    // Navigate back to settings or for-you page
    navigateToForYou();
  };

  return (
    <div className="App">
      {isLoggedIn && (
        <>
          <button className="burger-menu" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            onLogout={handleLogout} 
            onNavigateForYou={navigateToForYou} 
            onNavigateSettings={navigateToSettings} 
            onNavigateLibrary={navigateToLibrary} 
            onNavigateHelp={navigateToHelp} 
            onNavigateSearch={navigateToSearch} 
            onLogoClick={handleLogoClick} 
          />
        </>
      )}
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
          <ChoosePlanPage onUpgrade={handleUpgradeToPremium} />
        ) : currentPage === 'settings' ? (
          <SettingsPage 
            userName={userName} 
            userEmail={userEmail} 
            subscriptionPlan={subscriptionPlan}
            onUpgradeClick={navigateToChoosePlan}
          />
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
