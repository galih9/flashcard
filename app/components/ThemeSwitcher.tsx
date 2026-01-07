import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Button from './Button';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed top-4 right-4">
      <Button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
