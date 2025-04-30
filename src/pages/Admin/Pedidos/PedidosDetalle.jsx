import React from 'react'
import { usePedido, usePedidos } from '../../../hooks/api/usePedidos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { formatDate } from '../../../utils/formatDate';
import { DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { useNavigate, useParams } from 'react-router-dom';

const PedidosDetalle = () => {
    const id_pedido = parseInt(useParams().id_pedido, 10);
    const { data: pedido, error, isLoading } = usePedido(id_pedido);
    const navigate = useNavigate()
    console.log(pedido);

    const renderers = {
        precio_unitario: (rowData) => (
            <span>{Number(rowData.precio_unitario)?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
    };
    
    const columns = [
        { field: 'descripcion', header: 'Producto' },
        { field: 'precio_unitario', header: 'Precio Unitario' },
        { field: 'cantidad', header: 'Cantidad' },
    ];

    return (
        <DataTable
            rows={50} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={pedido ? pedido : []} // 👈 importante
            tableStyle={{ minWidth: '50rem', width: '100%' }}
            loading={isLoading}
            columns={columns}
            renderers={renderers}
            dataKey={'id_pedido_detalle'}
            selectable={false}
            onRowClick={''} // usando react-route
        />
    )
}

export default PedidosDetalle