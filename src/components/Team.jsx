import React, { useRef, useEffect, useState } from 'react';
import team1 from './assets/Group 21.png';
import team2 from './assets/Group 22.png';
import team3 from './assets/Group 23.png';

const Team = () => {
  const teamRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const teamImages = [team1, team2, team3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
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

  // Автопрокрутка слайдера
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, teamImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamImages.length) % teamImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const styles = {
    container: {
      padding: '60px 20px', // Уменьшили padding
      backgroundColor: '#fff',
      position: 'relative',
      overflow: 'hidden',
    },
    innerContainer: {
      maxWidth: '900px', // Уменьшили максимальную ширину
      margin: '0 auto',
      position: 'relative',
    },
    title: {
      textAlign: 'center',
      fontSize: '36px', // Уменьшили шрифт
      color: '#333',
      marginBottom: '15px',
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '16px', // Уменьшили шрифт
      color: '#666',
      marginBottom: '40px', // Уменьшили отступ
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      opacity: isVisible ? 1 : 0,
      transition: 'transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s',
    },
    sliderContainer: {
      position: 'relative',
      height: '350px', // ЗНАЧИТЕЛЬНО УМЕНЬШИЛИ ВЫСОТУ
      maxWidth: '800px', // Ограничили ширину
      margin: '0 auto',
      overflow: 'hidden',
      borderRadius: '10px', // Уменьшили скругление
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)', // Уменьшили тень
    },
    sliderWrapper: {
      display: 'flex',
      height: '100%',
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: 'transform 0.6s ease-in-out',
    },
    slide: {
      minWidth: '100%',
      height: '100%',
      position: 'relative',
    },
    slideImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain', // Меняем с cover на contain чтобы видеть всю картинку
      display: 'block',
      backgroundColor: '#f8f9fa', // Фон если изображение меньше контейнера
    },
    navButtons: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: 'none',
      width: '40px', // Уменьшили кнопки
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px', // Уменьшили шрифт
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      transition: 'all 0.3s',
      zIndex: 10,
    },
    prevButton: {
      left: '10px', // Уменьшили отступ
    },
    nextButton: {
      right: '10px',
    },
    dotsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px', // Уменьшили расстояние
      marginTop: '20px', // Уменьшили отступ
    },
    dot: {
      width: '10px', // Уменьшили точки
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#ddd',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      transition: 'all 0.3s',
    },
    activeDot: {
      backgroundColor: '#0066cc',
      transform: 'scale(1.1)', // Уменьшили масштаб
    },
    slideNumber: {
      position: 'absolute',
      bottom: '10px', // Уменьшили отступ
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '5px 12px', // Уменьшили padding
      borderRadius: '15px', // Уменьшили скругление
      fontSize: '12px', // Уменьшили шрифт
      zIndex: 5,
    },
  };

  return (
    <section style={styles.container} ref={teamRef}>
      <div style={styles.innerContainer}>
        <h2 style={styles.title}>Наша команда</h2>
        <p style={styles.subtitle}>
          Профессионалы с опытом от 4 до 15 лет в разработке и поддержке Drupal
        </p>

        <div style={styles.sliderContainer}>
          <button
            style={{ ...styles.navButtons, ...styles.prevButton }}
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            ‹
          </button>

          <div style={styles.sliderWrapper}>
            {teamImages.map((img, index) => (
              <div key={index} style={styles.slide}>
                <img
                  src={img}
                  alt={`Команда ${index + 1}`}
                  style={styles.slideImage}
                />
                <div style={styles.slideNumber}>
                  {index + 1} / {teamImages.length}
                </div>
              </div>
            ))}
          </div>

          <button
            style={{ ...styles.navButtons, ...styles.nextButton }}
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            ›
          </button>
        </div>

        <div style={styles.dotsContainer}>
          {teamImages.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentSlide ? styles.activeDot : {})
              }}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;