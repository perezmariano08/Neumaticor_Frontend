import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchListasPrecios } from '../../api/precios';

export const usePrecios = () => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["listas_precios"],
        queryFn: () => fetchListasPrecios(token),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};

