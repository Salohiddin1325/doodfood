import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  Moon, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Flame, 
  Clock 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    lang, 
    setLang, 
    theme, 
    toggleTheme, 
    t, 
    totalItemsCount, 
    setIsCartOpen 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#menu", label: t.nav.menu },
    { href: "#combos", label: t.nav.combos, badge: "HOT", badgeColor: "bg-red-600 text-white" },
    { href: "#builder", label: t.nav.builder, badge: "DIY", badgeColor: "bg-amber-500 text-slate-950 font-black" },
    { href: "#offers", label: t.nav.offers },
    { href: "#delivery", label: t.nav.delivery },
    { href: "#drinks", label: t.nav.drinks },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>{t.hero.badge}</span>
        <span className="hidden md:inline text-amber-200">|</span>
        <span className="hidden md:inline font-bold">📞 {t.delivery.phone}</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md bg-white/80 dark:bg-[#0F172A]/80 border-b border-slate-200/60 dark:border-slate-800/80 ${
          isScrolled ? 'shadow-md py-3' : 'py-3.5 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo clearly separated on the left */}
            <div className="flex items-center shrink-0 mr-auto xl:mr-6">
              <a href="#" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-glow-amber group-hover:scale-105 transition-transform">
                  <Flame className="w-6 h-6 animate-pulse text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight leading-none text-slate-900 dark:text-white font-display">
                    DOOD<span className="text-amber-500">FOOD</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 dark:text-amber-400">
                    Bektemir • 24/7
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links aligned horizontally in center */}
            <nav className="hidden xl:flex items-center justify-center gap-1.5 2xl:gap-3 mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[13px] 2xl:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 shrink-0"
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm shrink-0 leading-none ${
                        link.badgeColor || 'bg-gradient-to-r from-red-500 to-amber-500 text-white'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* Utility Controls grouped together on the right: Language, Theme, Cart */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto xl:ml-6">
              
              {/* Language Switcher UZ / RU / EN Segmented Control */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
                {[
                  { code: 'uz', label: 'UZ' },
                  { code: 'ru', label: 'RU' },
                  { code: 'en', label: 'EN' },
                ].map(({ code, label }) => {
                  const isActive = lang === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                      }`}
                      aria-label={`Switch language to ${label}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700/90 transition-all duration-200 active:scale-95 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center justify-center"
                aria-label="Toggle Dark/Light Mode"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700" />
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 via-amber-500 to-amber-600 hover:from-red-600 hover:to-amber-600 text-white font-bold text-sm shadow-md hover:shadow-glow-amber transition-all duration-200 active:scale-95 whitespace-nowrap"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline font-semibold">{t.nav.cart}</span>
                {totalItemsCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-red-600 text-xs font-black shadow-sm animate-pulse">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80"
                aria-label="Open Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200/70 dark:border-slate-800/80 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl px-6 pt-4 pb-6 space-y-2 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <span className="whitespace-nowrap">{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${
                      link.badgeColor || 'bg-amber-500 text-slate-900'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            {/* Mobile Language Switcher Row */}
            <div className="pt-3 pb-1 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/80">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Til / Язык / Language:</span>
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {[
                  { code: 'uz', label: 'UZ' },
                  { code: 'ru', label: 'RU' },
                  { code: 'en', label: 'EN' },
                ].map(({ code, label }) => {
                  const isActive = lang === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> {t.nav.openHours}
              </span>
              <a href="tel:+998712004444" className="font-bold text-red-500 dark:text-amber-400">
                +998 71 200 44 44
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
