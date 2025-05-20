import { URL_API } from "../../utils/constants";
import api from "../axios";

export const fetchPedidos = async (token) => {
    // const res = await fetch(`${URL_API}pedidos`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });
    
    // if (!res.ok) throw new Error("Error al cargar los datos de pedidos");
    // return res.json();
    try {
        const res = await api.get(`/pedidos`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de pedidos");
    }
};

export const fetchPedido = async (token, id_pedido) => {
    // const res = await fetch(`${URL_API}pedidos/${id_pedido}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });
    // if (!res.ok) throw new Error("Error al cargar los datos del pedido");
    // return res.json();
    try {
        const res = await api.get(`/pedidos/${id_pedido}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos del pedido");
    }
};

export const fetchPedidosPorUsuario = async (token, id_usuario) => {
    // const res = await fetch(`${URL_API}pedidos/usuarios/${id_usuario}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });

    // if (!res.ok) throw new Error("Error al cargar los datos de roles");
    // return res.json();

    try {
        const res = await api.get(`/pedidos/usuarios/${id_usuario}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de pedidos");
    }
};

export const fetchPedidoDetalle = async (token, id_usuario) => {
    // const res = await fetch(`${URL_API}pedidos/detalle/${id_usuario}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });

    // if (!res.ok) throw new Error("Error al cargar los datos de roles");
    // return res.json();

    try {
        const res = await api.get(`/pedidos/detalle/${id_usuario}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de pedidos");
    }
};

export const fetchPedidoDetallePorUsuario = async (token, id_usuario) => {
    // const res = await fetch(`${URL_API}pedidos/usuarios/detalle/${id_usuario}`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // });

    // if (!res.ok) throw new Error("Error al cargar los datos de roles");
    // return res.json();

    try {
        const res = await api.get(`/pedidos/usuarios/detalle/${id_usuario}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos del pedidos");
    }
};
