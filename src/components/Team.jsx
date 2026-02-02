import React, { useRef, useEffect, useState } from 'react';
import team from './assets/team.png';

const Team = () => {
  const teamRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Можно отключить observer после первого срабатывания
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // сработает когда 10% элемента в зоне видимости
      }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  const styles = {
    container: {
      padding: '80px 0',
      height: '1100px',
      overflow: 'hidden',
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 1s ease-out, opacity 1s ease-out',
      willChange: 'transform, opacity',
    },
    text: {
      textAlign: 'center',
      marginTop: '50px',
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s', // задержка 0.3s
    },
  };

  return (
    <section style={styles.container}>
      <div ref={teamRef} style={styles.innerContainer}>
        <div style={styles.imageContainer}>
          <img 
            src={team} 
            alt="Команда профессионалов"
            width={1000}
            style={{ 
              display: 'block',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        <p style={styles.text}>
          Команда профессионалов с опытом от 4 до 15 лет
        </p>
      </div>
    </section>
  );
};

export default Team;