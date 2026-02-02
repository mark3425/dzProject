import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './ContactForm.css'; // Создайте этот файл для стилей

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: Yup.string()
    .email('Неверный email')
    .required('Обязательное поле'),
  phone: Yup.string()
    .required('Обязательное поле')
    .matches(/^[0-9+\s()-]*$/, 'Введите корректный номер телефона'),
  message: Yup.string()
    .required('Обязательное поле')
    .min(10, 'Сообщение должно содержать минимум 10 символов')
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitStatus({ type: '', message: '' });

      try {
        // Отправка данных на Formcarry
        const response = await fetch('https://formcarry.com/s/NA424nm6eB8', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });

        const data = await response.json();
        
        if (data.code === 200) {
          setSubmitStatus({
            type: 'success',
            message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
          });
          resetForm();
        } else {
          throw new Error(data.message || 'Ошибка отправки формы');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '40px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px',
      display: 'block',
    },
    input: {
      padding: '14px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      transition: 'border-color 0.3s ease',
      fontFamily: 'inherit',
    },
    textarea: {
      padding: '14px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fff',
      transition: 'border-color 0.3s ease',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)',
    },
    error: {
      color: '#e74c3c',
      fontSize: '14px',
      marginTop: '5px',
      minHeight: '20px',
    },
    submitButton: {
      padding: '16px 32px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: '#3498db',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      marginTop: '10px',
    },
    submitButtonHover: {
      backgroundColor: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(52, 152, 219, 0.3)',
    },
    submitButtonDisabled: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#fff',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '10px',
      verticalAlign: 'middle',
    },
    statusMessage: {
      padding: '15px',
      borderRadius: '8px',
      marginTop: '20px',
      fontSize: '16px',
      textAlign: 'center',
    },
    successMessage: {
      backgroundColor: 'rgba(46, 204, 113, 0.1)',
      color: '#27ae60',
      border: '1px solid #2ecc71',
    },
    errorMessage: {
      backgroundColor: 'rgba(231, 76, 60, 0.1)',
      color: '#c0392b',
      border: '1px solid #e74c3c',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title} id="faq">Свяжитесь с нами</h2>
      
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            style={{
              ...styles.input,
              ...(formik.touched.name && formik.errors.name ? { borderColor: '#e74c3c' } : {}),
              ...(formik.values.name && !formik.errors.name ? { borderColor: '#2ecc71' } : {})
            }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => {
              e.target.style.borderColor = '#3498db';
              e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={styles.error}>{formik.errors.name}</div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите ваш email"
            style={{
              ...styles.input,
              ...(formik.touched.email && formik.errors.email ? { borderColor: '#e74c3c' } : {}),
              ...(formik.values.email && !formik.errors.email ? { borderColor: '#2ecc71' } : {})
            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => {
              e.target.style.borderColor = '#3498db';
              e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={styles.error}>{formik.errors.email}</div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Введите ваш телефон"
            style={{
              ...styles.input,
              ...(formik.touched.phone && formik.errors.phone ? { borderColor: '#e74c3c' } : {}),
              ...(formik.values.phone && !formik.errors.phone ? { borderColor: '#2ecc71' } : {})
            }}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => {
              e.target.style.borderColor = '#3498db';
              e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={styles.error}>{formik.errors.phone}</div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            name="message"
            placeholder="Введите ваше сообщение"
            style={{
              ...styles.textarea,
              ...(formik.touched.message && formik.errors.message ? { borderColor: '#e74c3c' } : {}),
              ...(formik.values.message && !formik.errors.message ? { borderColor: '#2ecc71' } : {})
            }}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => {
              e.target.style.borderColor = '#3498db';
              e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          {formik.touched.message && formik.errors.message && (
            <div style={styles.error}>{formik.errors.message}</div>
          )}
        </div>

        {submitStatus.message && (
          <div style={{
            ...styles.statusMessage,
            ...(submitStatus.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submitButtonDisabled : {}),
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {isSubmitting ? (
            <>
              <span style={styles.spinner}></span>
              Отправка...
            </>
          ) : (
            'Отправить'
          )}
        </button>
      </form>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ContactForm;