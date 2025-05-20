import React from 'react'
import { useUsuarios } from '../../../api/usuarios/useUsuarios';

const Dashboard = () => {
    const { data: usuarios, error, isLoading } = useUsuarios();
    
    return (
        <div>Usuarios: {
            usuarios?.length
        }</div>
    )
}

export default Dashboard