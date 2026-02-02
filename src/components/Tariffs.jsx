import React, { useRef, useEffect, useState } from 'react';

const Tariffs = () => {
    const tariffs = [
        { name: 'Стартовый', price: 'от 6 000', features: ['Консультации', 'SEO работы'] },
        { name: 'Бизнес', price: 'от 30 000', features: ['Все из Стартового', 'Услуги дизайнера'] },
        { name: 'VIP', price: 'от 270 000', features: ['Максимальное время реакции', 'Все включено'] },
    ];

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState([false, false, false]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        
                        // Последовательное появление карточек с задержкой
                        tariffs.forEach((_, index) => {
                            setTimeout(() => {
                                setCardsVisible(prev => {
                                    const newState = [...prev];
                                    newState[index] = true;
                                    return newState;
                                });
                            }, index * 200); // задержка 200ms между карточками
                        });

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
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
    }, [tariffs.length]);

    const styles = {
        section: {
            padding: '80px 20px',
            backgroundColor: '#fff',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        sectionTitle: {
            textAlign: 'center',
            marginBottom: '50px',
            fontSize: '56px',
            color: '#333',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
        },
        tariffsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
        },
        tariffCard: {
            border: '2px solid #0066cc',
            borderRadius: '10px',
            padding: '40px 30px',
            textAlign: 'center',
            transition: 'transform 0.3s, opacity 0.8s ease, transform 0.8s ease',
            opacity: 0,
            transform: 'translateY(50px)',
            backgroundColor: '#fff',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        },
        tariffName: {
            fontSize: '24px',
            color: '#0066cc',
            marginBottom: '20px',
            fontWeight: '600',
        },
        tariffPrice: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '30px',
        },
        featuresList: {
            listStyle: 'none',
            padding: 0,
            marginBottom: '30px',
        },
        featureItem: {
            padding: '10px 0',
            borderBottom: '1px solid #eee',
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.6',
        },
        tariffButton: {
            backgroundColor: '#e54931',
            color: '#fff',
            border: 'none',
            padding: '15px 30px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: '600',
            transition: 'background-color 0.3s, transform 0.3s',
            ':hover': {
                backgroundColor: '#d43b24',
                transform: 'translateY(-2px)',
            },
        }
    };

    // Стили для каждой карточки с индивидуальной анимацией
    const getCardStyle = (index) => ({
        ...styles.tariffCard,
        opacity: cardsVisible[index] ? 1 : 0,
        transform: cardsVisible[index] ? 'translateY(0)' : 'translateY(50px)',
        transitionDelay: `${index * 0.2}s`,
    });

    // Стиль для кнопки при наведении
    const buttonHoverStyle = {
        backgroundColor: '#d43b24',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    };

    return (
        <section ref={sectionRef} style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.sectionTitle} id="tariffs">Тарифы</h2>
                <div style={styles.tariffsGrid}>
                    {tariffs.map((tariff, index) => (
                        <div 
                            key={index} 
                            style={getCardStyle(index)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = cardsVisible[index] ? 'translateY(0)' : 'translateY(50px)';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                            }}
                        >
                            <h3 style={styles.tariffName}>{tariff.name}</h3>
                            <div style={styles.tariffPrice}>{tariff.price} руб/мес</div>
                            <ul style={styles.featuresList}>
                                {tariff.features.map((feature, idx) => (
                                    <li key={idx} style={styles.featureItem}>✓ {feature}</li>
                                ))}
                            </ul>
                            <button 
                                style={styles.tariffButton}
                                onMouseEnter={(e) => {
                                    Object.assign(e.currentTarget.style, buttonHoverStyle);
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e54931';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                Выбрать тариф
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tariffs;