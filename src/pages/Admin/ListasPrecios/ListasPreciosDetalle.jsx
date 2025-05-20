import React from 'react'
import { useParams } from 'react-router-dom';
import { useProductosConPrecio } from '../../../api/productos/useProductos';

const ListasPreciosDetalle = () => {
    const id_lista_precio = parseInt(useParams().id_lista_precio, 10);
    const { data: productos, error, isLoading } = useProductosConPrecio(id_lista_precio);
    console.log(productos);
    
    return (
        <div>ListasPreciosDetalle</div>
    )
}

export default ListasPreciosDetalle