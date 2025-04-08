import { URL_API } from "../utils/constants";

export const fetchAuthLogin = async ({ email, password }) => {
    const res = await fetch(`${URL_API}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al cargar los datos');
    }
    return res.json();
};
