import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    let saved = 'dark';
    try {
      saved = localStorage.getItem('portfolio-theme') || 'dark';
    } catch (e) {
      /* localStorage unavailable, default to dark */
    }
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (e) {
      /* ignore write failures */
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{ color: 'var(--accent-hex)', borderColor: 'color-mix(in oklab, var(--accent-hex) 40%, transparent)' }}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9997] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 border flex items-center justify-center cursor-pointer hover:bg-black/80 transition-all duration-300 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
