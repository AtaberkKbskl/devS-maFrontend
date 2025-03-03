import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  logoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const logoUrl = './logo.jpg'; // Logo yolu sabitlendi

  return (
    <header className="header">
      <img src={logoUrl} alt="Logo" className="header-logo" />
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
