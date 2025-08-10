export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const endPoints = {
    SIGN_IN : `${BACKEND_URL}/api/auth/signin`,
    PROJECT : `${BACKEND_URL}/api/project`,
    CLIENT_PROJECT : `${BACKEND_URL}/api/project/client`,
    FINANCE_SUMMARY : `${BACKEND_URL}/api/finance`,
}