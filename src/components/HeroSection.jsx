import React from 'react';

const HeroSection = () => {
  return (
    <div style={{display:"flex"}}>
    <section style={styles.hero}>
      <div className="container">
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Поддержка сайтов на Drupal</h1>
          <p style={styles.subtitle}>Сопровождение и поддержка сайтов на CMS Drupal любых версий и запущенности</p>
          <a style={styles.ctaButton} href="#tariffs"> тарифы</a>
        </div>
      </div>
    </section>
    <section style={styles.hero} >
      <ul style={{display:"flex",flexflow:"column warp",maxWidth:"350px",width:"100%",gap:"80px",marginTop:"50px"}}>
        <li style={{width:"200px",listStyle:"none"}}>Drupal-разработчик в России по версии рейтинга рунета</li>
        <li  style={{width:"200px",listStyle:"none"}}>Средний опыт специалистов более 3 лет</li>
      </ul>
 <ul style={{display:"flex",flexflow:"column warp",maxWidth:"350px",width:"100%",gap:"80px", marginTop:"20px"}}>
      <li  style={{width:"200px",listStyle:"none"}}>200+ модулей и тем в формате DrupalGive</li>
        <li  style={{width:"200px",listStyle:"none"}}>35000 часов поддержки на сайте Drupal</li>
        </ul>
    </section>
    </div>
  );
};

const styles = {
  hero: {
    color: '#fff',
    padding: '200px 0',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '66px',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '30px',
    opacity: '0.9',
  },
  ctaButton: {
    backgroundColor: '#ff6b00',
    color: '#fff',
    border: 'none',
    padding: '15px 40px',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default HeroSection;