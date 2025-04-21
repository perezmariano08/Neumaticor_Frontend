import { URL_API } from "../utils/constants";

export const fetchProductos = async () => {
    const res = await fetch(`${URL_API}productos`);
    if (!res.ok) throw new Error("Error al cargar los datos de productos");
    return res.json();
};

export const fetchProducto = async (id_producto) => {
    const res = await fetch(`${URL_API}productos/${id_producto}`);
    if (!res.ok) throw new Error("Error al cargar los datos del producto");
    return res.json();
};

export const fetchProductosDestacados = async () => {
    const res = await fetch(`${URL_API}productos-destacados`);
    if (!res.ok) throw new Error("Error al cargar los datos de productos");
    return res.json();
};

// Función para obtener productos con precios usando id_usuario
export const fetchProductosConPrecio = async (idUsuario, idProducto) => {
    // Verificamos si idProducto existe y armamos la URL correspondiente
    let url = `${URL_API}precios/productos`;  // Ruta base para obtener productos

    if (idProducto) {
        url += `/${idProducto}`;  // Si idProducto está presente, lo agregamos al path
    }

    url += `?id_usuario=${idUsuario}`;  // Siempre agregamos el id_usuario a la query string

    const res = await fetch(url, { 
        method: 'GET',
    });

    if (!res.ok) throw new Error("Error al cargar el producto con precios");
    return res.json(); // Devolvemos el producto con su precio
};
