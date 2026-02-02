import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
    name: 'form',
    initialState: {
        isPopupOpen: false,
        isSubmitting: false,
        error: null,
        formData: {
            name: localStorage.getItem('formName') || '',
            email: localStorage.getItem('formEmail') || '',
            phone: localStorage.getItem('formPhone') || '',
            message: localStorage.getItem('formMessage') || ''
        }
    },
    reducers: {
        openPopup: (state) => {
            state.isPopupOpen = true
        },
        closePopup: (state) => {
            state.isPopupOpen = false
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
            Object.keys(action.payload).forEach(key => {
                localStorage.setItem(`form${key.charAt(0).toUpperCase() + key.slice(1)}`, action.payload[key])
            })
        },
        startSubmitting: (state) => {
            state.isSubmitting = true
            state.error = null
        },
        submitSuccess: (state) => {
            state.isSubmitting = false
            state.error = null
            state.formData = { name: '', email: '', phone: '', message: '' }
        },
        submitError: (state, action) => {
            state.isSubmitting = false
            state.error = action.payload
        }
    }
})

export const { openPopup, closePopup, setFormData, startSubmitting, submitSuccess, submitError } = formSlice.actions
export default formSlice.reducer