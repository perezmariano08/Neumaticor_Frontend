import { URL_API } from "../../utils/constants";

export const fetchListasPrecios = async (token) => {
    const res = await fetch(`${URL_API}precios/listas`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de usuarios");
    return res.json();
};
