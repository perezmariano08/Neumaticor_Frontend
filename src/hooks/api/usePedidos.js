import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchPedido, fetchPedidoDetallePorUsuario, fetchPedidos, fetchPedidosPorUsuario } from '../../api/pedidos';

export const usePedidos = () => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pedidos"],
        queryFn: () => fetchPedidos(token),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};

export const usePedido = (id_pedido) => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pedido", id_pedido],
        queryFn: () => fetchPedido(token, id_pedido),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};

export const usePedidosUsuario = (id_usuario) => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pedidosUsuario", id_usuario],
        queryFn: () => fetchPedidosPorUsuario(token, id_usuario),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};


export const usePedidoDetalleUsuario = (id_usuario) => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["pedidoDetalleUsuario", id_usuario],
        queryFn: () => fetchPedidoDetallePorUsuario(token, id_usuario),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};
