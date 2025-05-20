import { useQuery } from '@tanstack/react-query';
import { fetchMarcas, fetchProducto, fetchProductos, fetchProductosConPrecio } from "./productos";
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '../axios';

export const useProductos = () => {
    return useQuery({
        queryKey: ["productos"],
        queryFn: fetchProductos,
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useProducto = (id_producto) => {
    return useQuery({
        queryKey: ["producto", id_producto],  // Cambié esto para hacer que la caché sea única por producto
        queryFn: () => fetchProducto(id_producto), // Cambié esto para que no se ejecute inmediatamente
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
    });
};

export const useProductosConPrecio = (idProducto) => {
    const idUsuario = useSelector((state) => state.user.user?.id_usuario); // Obtenemos el id_usuario desde Redux
    
    return useQuery({
        queryKey: ['productosPrecios', idUsuario, idProducto], // Añadimos id_usuario y id_producto (si existe) a la key para asegurar que la consulta se realice con el id correcto
        queryFn: () => fetchProductosConPrecio(idUsuario, idProducto), // Pasamos id_usuario y id_producto como parámetros
        staleTime: 1000 * 60 * 5, // Tiempo de caché
    });
};

export const useMarcas = () => {
    const token = useSelector((state) => state.user.token);

    return useQuery({
        queryKey: ["marcas", token],
        queryFn: () => fetchMarcas(token), // ✅ AHORA SÍ se ejecuta correctamente
        staleTime: 1000 * 60 * 0.5, // Caché de 5 minutos
        enabled: !!token, // ⚠️ Esto evita que se haga la query si no hay token
    });
};

export const useCrearProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (nuevoProducto) => {
            const res = await api.post("/productos/crear", nuevoProducto);
            return res.data;
        },
        onSuccess: () => {
            // Actualiza la caché de productos cuando se cree uno nuevo
            queryClient.invalidateQueries(["productos"]);
        },
        onError: (error) => {
            console.error("Error al crear producto:", error);
        },
    });
};

export const useActualizarProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ datos }) => {
            const res = await api.put(`/productos/editar`, datos);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["productos"]); // ✅ Opcional: refresca la lista de productos
        },
        onError: (error) => {
            console.error("Error al actualizar producto:", error);
        },
    });
};
