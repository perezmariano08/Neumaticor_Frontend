import { URL_API } from "../../utils/constants";

export const fetchUsuarios = async (token) => {
    const res = await fetch(`${URL_API}usuarios`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de usuarios");
    return res.json();
};


export const fetchRoles = async (token) => {
    const res = await fetch(`${URL_API}usuarios/roles`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de roles");
    return res.json();
};

export const fetchSolicitudes = async (token) => {
    const res = await fetch(`${URL_API}usuarios/solicitudes`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de solicitudes");
    return res.json();
};
