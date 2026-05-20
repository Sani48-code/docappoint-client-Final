import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {dark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
}
