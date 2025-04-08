import { URL_API } from "../utils/constants";

export const fetchProductos = async () => {
    const res = await fetch(`${URL_API}productos`);
    if (!res.ok) throw new Error("Error al cargar los datos de productos");
    return res.json();
};

export const fetchProductosDestacados = async () => {
    const res = await fetch(`${URL_API}productos-destacados`);
    if (!res.ok) throw new Error("Error al cargar los datos de productos");
    return res.json();
};