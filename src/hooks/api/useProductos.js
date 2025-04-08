import { useQuery } from '@tanstack/react-query';
import { fetchProductos, fetchProductosDestacados } from "../../api/productos";

export const useProductos = () => {
    return useQuery({
        queryKey: ["productos"],
        queryFn: fetchProductos,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};


export const useProductosDestacados = () => {
    return useQuery({
        queryKey: ["productosDestacados"],
        queryFn: fetchProductosDestacados,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};
