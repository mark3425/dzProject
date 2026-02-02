import React from 'react';
import './DesktopMenu.css';

const DesktopMenu = () => {
  return (
    <div style={{display:"flex",flexDirection:"row",marginLeft:"100px"}}>
     <nav className="desktop-menu">
      <ul className="menu-list">
        <li><a href="#services">ПОДДЕРЖКА САЙТОВ</a></li>
        <li><a href="#tariffs">ТАРИФЫ</a></li>
        <li><a href="#services">НАШИ РАБОТЫ</a></li>
        <li><a href="#faq">ОТЗЫВЫ</a></li>
        <li><a href="#faq">КОНТАКТЫ</a></li>
      </ul>
    </nav>
    <div style={{display:"flex",flexDirection:"row",marginLeft:"70px"}}>
                <div >
                    8 800 222 26 73
                </div>
                <div style={{marginLeft:"70px"}}>
                    RU ▼
                </div>
                </div>
        </div>
  );
};

export default DesktopMenu;