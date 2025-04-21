import { useQuery } from '@tanstack/react-query';
import { fetchUsuarios } from '../../api/usuarios';
import { useSelector } from 'react-redux';

export const useUsuarios = () => {
    const token = useSelector((state) => state.user.token);
    
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: () => fetchUsuarios(token),
        staleTime: 1000 * 60 * 0.5,
        enabled: !!token, // Solo hace la consulta si hay token
    });
};

