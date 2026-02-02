import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container">
                <div style={styles.footerContent}>
                    <p style={styles.copyright}>© Drupal-coder {new Date().getFullYear()}</p>
                    <p style={styles.phone}>8 800 222-26-73</p>
                    <p style={styles.email}>info@drupal-coder.ru</p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 0',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    copyright: {
        margin: 0,
        fontSize: '14px',
        opacity: '0.8',
    },
    phone: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    email: {
        margin: 0,
        fontSize: '14px',
        opacity: '0.8',
    }
};

export default Footer;