'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    if (typeof window !== 'undefined') {
      setDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update DOM
    document.documentElement.classList.toggle('dark');
    // Save preference
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="theme-toggle fixed top-4 right-4 p-2 rounded-lg bg-background hover:bg-dark-accent transition-colors"
      aria-label="Toggle dark mode"
      data-component="theme-toggle"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
} 