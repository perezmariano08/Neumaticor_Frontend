import api from "../axios";

export const fetchProductos = async () => {
    try {
        const res = await api.get("/productos");
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de productos");
    }
};

export const fetchProducto = async (id_producto) => {
    try {
        const res = await api.get(`/productos/${id_producto}`);
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos del producto");
    }
};

// Función para obtener productos con precios usando id_usuario
export const fetchProductosConPrecio = async (idUsuario, idProducto) => {
    try {
        let url = `/precios/productos`;

        if (idProducto) {
            url += `/${idProducto}`;
        }

        const params = {};
        if (idUsuario) {
            params.id_usuario = idUsuario;
        }

        const res = await api.get(url, { params });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar el producto con precios");
    }
};


export const fetchMarcas = async (token) => {
    try {
        const res = await api.get(`productos/marcas`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error al cargar los datos de productos");
    }
};
