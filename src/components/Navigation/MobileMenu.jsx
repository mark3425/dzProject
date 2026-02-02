import React from 'react';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
      <div className="mobile-menu">
        <button className="close-menu" onClick={onClose}>×</button>
        <nav>
          <ul className="mobile-menu-list">
            <li><a href="#services" onClick={onClose}>Услуги</a></li>
            <li><a href="#tariffs" onClick={onClose}>Тарифы</a></li>
            <li><a href="#tariffs" onClick={onClose}>Наши</a></li>
            <li><a href="#services" onClick={onClose}>Кейсы</a></li>
            <li><a href="#faq" onClick={onClose}>FAQ</a></li>
            <li><a href="#contact" onClick={onClose}>Контакты</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;