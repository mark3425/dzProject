import React, { useRef, useEffect, useState } from 'react';
import logo1 from './assets/competency-1.svg';
import logo2 from './assets/competency-2.svg';
import logo3 from './assets/competency-3.svg';
import logo4 from './assets/competency-4.svg';
import logo5 from './assets/competency-5.svg';
import logo6 from './assets/competency-6.svg';
import logo7 from './assets/competency-7.svg';
import logo8 from './assets/competency-8.svg';

const Services = () => {
  const services = [
    { title: 'Добавление информации на сайт, Создание новых разделов', icon: logo1 },
    { title: 'Разработка модулей сайта , кастомизация функционала', icon: logo2 },
    { title: 'Интеграция с CRM, 1C, Платежными системами и веб-сервисами', icon: logo3 },
    { title: 'Любые доработки Функционала и дизайна', icon: logo4 },
    { title: 'Аудит и мониторинг безопасности Drupal', icon: logo5 },
    { title: 'Миграция, импорт контента и апгрейд Drupal', icon: logo6 },
    { title: 'Оптимизация и ускорение Drupal-сайтов', icon: logo7 },
    { title: 'Веб маркетинг, консультации и работы по SEO', icon: logo8 },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(Array(services.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Последовательное появление карточек с задержкой
            services.forEach((_, index) => {
              setTimeout(() => {
                setCardsVisible(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150); // задержка 150ms между карточками
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // сработает за 50px до попадания в viewport
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [services.length]);

  const styles = {
    section: {
      padding: '80px 20px',
      height: 'auto',
      minHeight: '1100px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s ease',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    sectionTitle: {
      marginTop: '50px',
      marginBottom: '30px',
      fontSize: '58px',
      color: '#333',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      lineHeight: '1.2',
    },
    subtitle: {
      width: '550px',
      marginBottom: '60px',
      fontSize: '20px',
      color: '#666',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
      lineHeight: '1.6',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
    },
    serviceCard: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(40px) scale(0.95)',
      transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '220px',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid transparent',
    },
    iconContainer: {
      marginBottom: '20px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    icon: {
      width: '60px',
      height: '60px',
      transition: 'transform 0.3s ease',
    },
    serviceTitle: {
      color: '#60647b',
      marginBottom: '0',
      fontSize: '18px',
      lineHeight: '1.5',
      transition: 'color 0.3s ease',
    },
  };

  // Стили для каждой карточки с индивидуальной анимацией
  const getCardStyle = (index) => ({
    ...styles.serviceCard,
    opacity: cardsVisible[index] ? 1 : 0,
    transform: cardsVisible[index] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
    transitionDelay: `${index * 0.15}s`,
  });

  // Функции для hover-эффектов
  const handleMouseEnter = (e, index) => {
    if (cardsVisible[index]) {
      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      e.currentTarget.style.borderColor = '#3498db';
      
      const icon = e.currentTarget.querySelector('img');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
      
      const title = e.currentTarget.querySelector('h3');
      if (title) {
        title.style.color = '#2980b9';
      }
    }
  };

  const handleMouseLeave = (e, index) => {
    if (cardsVisible[index]) {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      e.currentTarget.style.borderColor = 'transparent';
      
      const icon = e.currentTarget.querySelector('img');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
      
      const title = e.currentTarget.querySelector('h3');
      if (title) {
        title.style.color = '#60647b';
      }
    }
  };

  return (
    <section ref={sectionRef} style={styles.section}>
      <div  style={styles.container}>
        <h2 style={styles.sectionTitle} id="services">
          13 лет совершенствуем компетенции в Drupal поддержке!
        </h2>
        <h3 style={styles.subtitle}>
          Разрабатываем и оптимизируем модули, расширяем функциональность сайтов, обновляем дизайн
        </h3>
        
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              style={getCardStyle(index)}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={(e) => handleMouseLeave(e, index)}
              onClick={() => {
                // Можно добавить обработчик клика, если нужно
                console.log(`Clicked: ${service.title}`);
              }}
            >
              <div style={styles.iconContainer}>
                <img 
                  src={service.icon} 
                  alt={service.title}
                  style={styles.icon}
                />
              </div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;