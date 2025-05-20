import React from 'react'
import { ProductosAdminMenuItem, ProductosAdminMenuLista } from './ProductosAdminStyles'
import { NavLink } from 'react-router-dom'

const ProductosMenu = ({ productos, estadoSeleccionado, setEstadoSeleccionado }) => {
    return (
        <ProductosAdminMenuLista>
            <ProductosAdminMenuItem
                
                onClick={() => setEstadoSeleccionado('todos')}
            >
                <button className={estadoSeleccionado === 'todos' ? 'active' : ''}>Todos <span>({productos?.length})</span></button>
            </ProductosAdminMenuItem>
            <ProductosAdminMenuItem
                
                onClick={() => setEstadoSeleccionado('A')}
            >
                <button className={estadoSeleccionado === 'A' ? 'active' : ''}>Activos <span>({productos?.filter(p => p.estado === 'A').length})</span></button>
            </ProductosAdminMenuItem>
            <ProductosAdminMenuItem
                
                onClick={() => setEstadoSeleccionado('I')}
            >
                <button className={estadoSeleccionado === 'I' ? 'active' : ''}>Inactivos <span>({productos?.filter(p => p.estado === 'I').length})</span></button>
            </ProductosAdminMenuItem>
        </ProductosAdminMenuLista>
    )
}

export default ProductosMenu
