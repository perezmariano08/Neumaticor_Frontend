import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios";
import { useSelector } from "react-redux";
import { fetchPagoDetalle, fetchPagos } from "./pagos";


export const usePagos = () => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pagos"],
        queryFn: () => fetchPagos(token),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};

export const usePagoDetalle = (id_pago) => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pagosDetalle", id_pago],
        queryFn: () => fetchPagoDetalle(token, id_pago),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};


export const useRegistrarPago = () => {
    const queryClient = useQueryClient();
    const token = useSelector((state) => state.user.token);

    return useMutation({
        mutationFn: async (nuevoPago) => {
            const res = await api.post("/pagos/registrar", nuevoPago, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["pagos"]);
        },
        onError: (error) => {
            console.error("Error al registrar el pago:", error);
        },
    });
};