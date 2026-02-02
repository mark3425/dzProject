import React, { useRef, useEffect, useState } from 'react';
import sup1 from './assets/support1.svg';
import sup2 from './assets/support2.svg';
import sup3 from './assets/support3.svg';
import sup4 from './assets/support4.svg';
import sup5 from './assets/support5.svg';
import sup6 from './assets/support6.svg';
import sup7 from './assets/support7.svg';
import sup8 from './assets/support8.svg';

const DrupalCoderSupport = () => {
  const features = [
    {
      id: '01',
      title: 'Постановка задачи по Email',
      description: 'Удобная и привычная модель постановки задач, при которой задачи фиксируются и никогда не теряются.',
      icon: sup1
    },
    {
      id: '02',
      title: 'Система Helpdesk – отчетность, прозрачность',
      description: 'Возможность посмотреть все заявки в работе и отработанные часы в личном кабинете через браузер.',
      icon: sup2
    },
    {
      id: '03',
      title: 'Расширенная техническая поддержка',
      description: 'Возможность организации расширенной техподдержки с 6:00 до 22:00 без выходных.',
      icon: sup3
    },
    {
      id: '04',
      title: 'Персональный менеджер проекта',
      description: 'Ваш менеджер проекта всегда в курсе текущего состояния проекта и в любой момент готов ответить на любые вопросы.',
      icon: sup4
    },
    {
      id: '05',
      title: 'Удобные способы оплаты',
      description: 'Безналичный расчет по договору или электронные деньги: WebMoney, Яндекс.Деньги, Paypal.',
      icon: sup5
    },
    {
      id: '06',
      title: 'Работаем с SLA и NDA',
      description: 'Работа в рамках соглашений о конфиденциальности и об уровне качества работ.',
      icon: sup6
    },
    {
      id: '07',
      title: 'Штатные специалисты',
      description: 'Надежные штатные специалисты, никаких фрилансеров.',
      icon: sup7
    },
    {
      id: '08',
      title: 'Удобные каналы связи',
      description: 'Консультации по телефону, скайпу, в мессенджерах.',
      icon: sup8
    }
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(Array(features.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Последовательное появление карточек с задержкой
            features.forEach((_, index) => {
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
        rootMargin: '50px',
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
  }, [features.length]);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    titleContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: '40px',
    },
    mainTitle: {
      fontSize: '56px',
      fontWeight: '700',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee',
      color: '#2c3e50',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
      textAlign: 'center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '30px',
    },
    featureCard: {
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '25px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'box-shadow 0.3s ease, transform 0.6s ease, opacity 0.6s ease',
      position: 'relative',
      opacity: 0,
      transform: 'translateY(40px)',
      minHeight: '200px',
    },
    featureCardHover: {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-5px)',
    },
    featureHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    featureId: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#6f7487',
      marginRight: '10px',
      lineHeight: '1',
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0',
      color: '#2c3e50',
      lineHeight: '1.3',
      paddingRight: '40px', // Место для иконки
      transition: 'color 0.3s ease',
    },
    featureTitleHover: {
      color: '#3498db',
    },
    featureDescription: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#555',
      margin: '0',
      transition: 'color 0.3s ease',
    },
    featureDescriptionHover: {
      color: '#666',
    },
    iconContainer: {
      position: 'absolute',
      top: '25px',
      right: '25px',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
    },
    iconHover: {
      transform: 'scale(1.2) rotate(5deg)',
    },
    // Медиа-запросы
    '@media (max-width: 768px)': {
      featuresGrid: {
        gridTemplateColumns: '1fr',
        gap: '20px',
      },
      featureCard: {
        padding: '20px',
      },
      mainTitle: {
        fontSize: '32px',
      },
      featureTitle: {
        fontSize: '16px',
        paddingRight: '35px',
      },
      featureDescription: {
        fontSize: '14px',
      },
      iconContainer: {
        top: '20px',
        right: '20px',
        width: '25px',
        height: '25px',
      },
    },
    '@media (max-width: 480px)': {
      container: {
        padding: '20px 15px',
      },
      featureHeader: {
        flexDirection: 'column',
      },
      featureId: {
        marginBottom: '5px',
        marginRight: '0',
      },
      mainTitle: {
        fontSize: '28px',
      },
    },
  };

  // Стили для каждой карточки
  const getCardStyle = (index) => ({
    ...styles.featureCard,
    opacity: cardsVisible[index] ? 1 : 0,
    transform: cardsVisible[index] ? 'translateY(0)' : 'translateY(40px)',
    transitionDelay: `${index * 0.15}s`,
  });

  // Функции для hover-эффектов
  const handleMouseEnter = (e, index) => {
    if (cardsVisible[index]) {
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(-5px)';
      
      const icon = e.currentTarget.querySelector('.icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
      }
      
      const title = e.currentTarget.querySelector('.title');
      if (title) {
        title.style.color = '#3498db';
      }
      
      const description = e.currentTarget.querySelector('.description');
      if (description) {
        description.style.color = '#666';
      }
    }
  };

  const handleMouseLeave = (e, index) => {
    if (cardsVisible[index]) {
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
      e.currentTarget.style.transform = 'translateY(0)';
      
      const icon = e.currentTarget.querySelector('.icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
      
      const title = e.currentTarget.querySelector('.title');
      if (title) {
        title.style.color = '#2c3e50';
      }
      
      const description = e.currentTarget.querySelector('.description');
      if (description) {
        description.style.color = '#555';
      }
    }
  };

  return (
    <div ref={sectionRef} style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.mainTitle}>Поддержка от Drupal-coder</h1>
      </div>
      <div style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div 
            key={feature.id} 
            style={getCardStyle(index)}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
          >
            <div style={styles.featureHeader}>
              <span style={styles.featureId}>{feature.id}.</span>
              <h2 className="title" style={styles.featureTitle}>{feature.title}</h2>
            </div>
            <p className="description" style={styles.featureDescription}>{feature.description}</p>
            
            <div className="icon" style={styles.iconContainer}>
              <img 
                src={feature.icon} 
                alt={feature.title}
                width={30} 
                height={30}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrupalCoderSupport;