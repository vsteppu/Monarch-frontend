export const isGoogleRecaptchaEnabled = () => {
    return import.meta.env.VITE_GOOGLE_RECAPTCHA_ENABLED === 'true'
}