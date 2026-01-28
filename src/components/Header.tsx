import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import LendsqrLogo from './LendsqrLogo';
import profile_image from '../assets/profile_image.png';
import '../styles/components/Header.scss';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <LendsqrLogo />
        </div>
        
        <div className="header__search">
          <input
            type="text"
            className="header__search-input"
            placeholder="Search for anything"
          />
          <button className="header__search-button" aria-label="Search">
            <Search />
          </button>
        </div>
      </div>
      
      <div className="header__right">
        <a href="#" className="header__docs">Docs</a>
        
        <button className="header__notification" aria-label="Notifications">
          <Bell />
        </button>
        
        <div className="header__user">
          <img
            src={profile_image}
            alt="User avatar"
            className="header__avatar"
          />
          <span className="header__username">
            Adedeji
            <ChevronDown />
          </span>
        </div>
        
        <button className="header__menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <Menu />
        </button>
      </div>
    </header>
  );
};

export default Header;
