import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { preloadRoute } from '../utils/routePreloader';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langMenuRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { name: t('home') || 'home', path: '/' },
    { name: t('events'), path: '/events' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('resources'), path: '/resources' },
    { name: t('contact'), path: '/contact' },
    { name: t('recruitment'), path: '/registration' },
  ].filter(link => link.path !== location.pathname);

  const flags = {
    en: "https://flagcdn.com/w40/gb.png",
    fr: "https://flagcdn.com/w40/fr.png",
    ar: "https://flagcdn.com/w40/dz.png"
  };

  const currentLang = (i18n.language || 'en').substring(0, 2);
  const currentFlag = flags[currentLang] || flags.en;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out ${isScrolled ? 'pt-4 px-4 sm:px-6 md:px-12 pointer-events-none' : 'pt-0 px-0'}`}>
        <header 
          dir="ltr" 
          className={`mx-auto w-full flex justify-between items-center bg-surface/80 backdrop-blur-md font-body transition-all duration-500 pointer-events-auto
            ${isScrolled 
              ? 'py-3 px-6 rounded-2xl shadow-xl border border-outline-variant/30 max-w-7xl' 
              : 'py-4 px-4 sm:px-6 md:px-12 border-b border-outline-variant/20 max-w-none'
            }`}
        >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" aria-label="Mirai Club Home" className="hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-20">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              className="text-xs font-body font-semibold uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" 
              to={link.path}
              onMouseEnter={() => preloadRoute(link.path)}
              onFocus={() => preloadRoute(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative z-10">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="flex items-center justify-center w-8 h-8 rounded-full text-black hover:bg-surface-variant transition-colors"
            title="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-lg">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Language Dropdown */}
          <div className="flex items-center relative z-50" ref={langMenuRef}>
            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} aria-label={`Language Selector: ${currentLang}`} aria-expanded={isLangMenuOpen}>
              <div className="w-5 h-5 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-variant">
                <img src={currentFlag} alt={currentLang} className="w-full h-full object-cover" />
              </div>
              <svg className={`w-4 h-4 text-black opacity-70 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-surface-container border border-outline-variant/30 rounded-xl shadow-md py-2 min-w-[140px] flex flex-col z-50">
                <button onClick={() => changeLanguage('en')} className={`px-4 py-2 text-sm text-left hover:bg-surface-variant transition-colors flex items-center gap-2 ${currentLang === 'en' ? 'font-bold text-[#9D4EDD]' : 'text-black'}`}>
                  <img src={flags.en} alt="EN" className="w-4 h-4 rounded-full object-cover shadow-sm border border-outline-variant/20" /> English
                </button>
                <button onClick={() => changeLanguage('fr')} className={`px-4 py-2 text-sm text-left hover:bg-surface-variant transition-colors flex items-center gap-2 ${currentLang === 'fr' ? 'font-bold text-[#9D4EDD]' : 'text-black'}`}>
                  <img src={flags.fr} alt="FR" className="w-4 h-4 rounded-full object-cover shadow-sm border border-outline-variant/20" /> Français
                </button>
                <button onClick={() => changeLanguage('ar')} className={`px-4 py-2 text-sm text-left hover:bg-surface-variant transition-colors flex items-center gap-2 ${currentLang === 'ar' ? 'font-bold text-[#9D4EDD]' : 'text-black'}`}>
                  <img src={flags.ar} alt="AR" className="w-4 h-4 rounded-full object-cover shadow-sm border border-outline-variant/20" /> <span className="font-semibold" style={{ fontFamily: '"Tajawal", sans-serif' }}>العربية</span>
                  </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center text-black hover:opacity-70 transition-opacity" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Mobile Menu" aria-expanded={isMobileMenuOpen}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-[280px] bg-surface border-l border-outline-variant/20 shadow-xl transition-transform duration-300 ease-in-out z-50 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button className="flex items-center justify-center text-black hover:text-[#9D4EDD] transition-colors" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Mobile Menu">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <div className="p-6 pt-0 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              className="text-base font-body font-bold uppercase tracking-widest text-black hover:text-[#9D4EDD] transition-colors border-b border-outline-variant/10 pb-4 block" 
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => preloadRoute(link.path)}
              onFocus={() => preloadRoute(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
