export const submitForm = async (formData) => {
    // Замените на ваш URL сервиса форм
    const response = await fetch('https://your-form-service.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error('Ошибка при отправке формы')
    }

    return response.json()
}