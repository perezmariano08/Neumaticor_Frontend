import { URL_API } from "../utils/constants";

export const fetchPedidos = async (token) => {
    const res = await fetch(`${URL_API}pedidos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!res.ok) throw new Error("Error al cargar los datos de pedidos");
    return res.json();
};

export const fetchPedido = async (token, id_pedido) => {
    const res = await fetch(`${URL_API}pedidos/${id_pedido}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Error al cargar los datos del pedido");
    return res.json();
};

export const fetchPedidosPorUsuario = async (token, id_usuario) => {
    const res = await fetch(`${URL_API}pedidos/usuarios/${id_usuario}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de roles");
    return res.json();
};


export const fetchPedidoDetallePorUsuario = async (token, id_usuario) => {
    const res = await fetch(`${URL_API}pedidos/usuarios/detalle/${id_usuario}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar los datos de roles");
    return res.json();
};
