import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { closePopup, startSubmitting, submitSuccess, submitError } from '../store/formSlice'
import { submitForm } from '../utils/api'
import './PopupContactForm.css'

const validationSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  email: Yup.string().email('Неверный email').required('Обязательное поле'),
  phone: Yup.string().required('Обязательное поле'),
  message: Yup.string().required('Обязательное поле')
})

const PopupContactForm = () => {
  const dispatch = useDispatch()
  const { isPopupOpen, isSubmitting, error } = useSelector(state => state.form)
  const [animationProgress, setAnimationProgress] = useState(0)
  const popupRef = useRef()

  // Локальное состояние для формы
  const [formValues, setFormValues] = useState({
    name: localStorage.getItem('formName') || '',
    email: localStorage.getItem('formEmail') || '',
    phone: localStorage.getItem('formPhone') || '',
    message: localStorage.getItem('formMessage') || ''
  })

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(startSubmitting())
      try {
        await submitForm(values)
        // Сохраняем в LocalStorage
        Object.keys(values).forEach(key => {
          localStorage.setItem(`form${key.charAt(0).toUpperCase() + key.slice(1)}`, values[key])
        })
        dispatch(submitSuccess())
        dispatch(closePopup())
      } catch (err) {
        dispatch(submitError(err.message))
      }
    }
  })

  useEffect(() => {
    if (isPopupOpen) {
      setAnimationProgress(0)
      const timer = setTimeout(() => setAnimationProgress(1), 16)
      return () => clearTimeout(timer)
    }
  }, [isPopupOpen])

  // Простая анимация без useRequestAnimationFrame
  useEffect(() => {
    if (isPopupOpen && animationProgress < 1) {
      const timer = setTimeout(() => {
        setAnimationProgress(prev => Math.min(prev + 0.02, 1))
      }, 16)
      return () => clearTimeout(timer)
    }
  }, [isPopupOpen, animationProgress])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dispatch(closePopup())
      }
    }

    if (isPopupOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isPopupOpen, dispatch])

  if (!isPopupOpen) return null

  const scale = 0.8 + (animationProgress * 0.2)
  const opacity = animationProgress
  const translateY = (1 - animationProgress) * 50

  const style = {
    transform: `scale(${scale}) translateY(${translateY}px)`,
    opacity: opacity
  }

  return (
    <div className="popup-overlay" onClick={() => dispatch(closePopup())}>
      <div
        ref={popupRef}
        className="popup-content"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={() => dispatch(closePopup())}>
          ×
        </button>

        <h2>Свяжитесь с нами</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Сообщение"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="4"
            />
            {formik.touched.message && formik.errors.message && (
              <div className="error">{formik.errors.message}</div>
            )}
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Отправка...
              </>
            ) : 'Отправить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupContactForm