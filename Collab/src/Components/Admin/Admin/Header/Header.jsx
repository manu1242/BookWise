import React from 'react';
import { Menu, Bell, Settings, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({ setSidebarOpen, darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
        <Menu size={24} />
      </button>
      
      <div className="header-right">
        <button className="header-btn">
          <Bell size={20} />
        </button>
        <button className="header-btn">
          <Settings size={20} />
        </button>
        <button className="header-btn" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;