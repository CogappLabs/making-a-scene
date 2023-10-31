'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@heroicons/react/20/solid';
import { SunIcon } from '@heroicons/react/20/solid';

export default function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const darkModeClickHandler = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button
      className="w-[30px]"
      onClick={darkModeClickHandler}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
