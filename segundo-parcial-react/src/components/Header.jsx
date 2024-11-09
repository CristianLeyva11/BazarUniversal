import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/ventas'); 
  };

  return (
    <div className='app-container-header'>
      <img 
        src={logo} 
        alt="Bazar Online Logo" 
        className="logo" 
        onClick={handleLogoClick} 
        style={{ cursor: 'pointer' }} 
      />
      <h1>Bazar Universal Online</h1>
    </div>
  );
};

export default Header;
