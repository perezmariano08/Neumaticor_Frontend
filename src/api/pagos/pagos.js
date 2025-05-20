import api from "../axios";

export const fetchPagos = async (token) => {
    try {
        const res = await api.get(`/pagos`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de pagos");
    }
};

export const fetchPagoDetalle = async (token, id_pago) => {
    try {
        const res = await api.get(`/pagos/detalle/${id_pago}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de pagos");
    }
};