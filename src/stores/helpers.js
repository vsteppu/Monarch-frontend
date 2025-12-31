export const apiPrefix = import.meta.env.NODE_ENV !== 'production' 
    ? '/api'
    : ''

export const isGoogleRecaptchaEnabled = () => {
    return import.meta.env.VITE_GOOGLE_RECAPTCHA_ENABLED === 'true'
}

export const sanitizeDate = (param) => {
    const parseDate = new Date(param);
    return parseDate.toLocaleDateString("en-GB");
};

export const sanitizeTime = (param) => {
    const parseDate = new Date(param);
    return parseDate.toLocaleDateString("en-GB");
};