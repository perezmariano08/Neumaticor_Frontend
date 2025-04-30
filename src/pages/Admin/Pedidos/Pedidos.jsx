import React from 'react'
import { usePedidos } from '../../../hooks/api/usePedidos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { formatDate } from '../../../utils/formatDate';
import { DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { useNavigate } from 'react-router-dom';

const Pedidos = () => {
    const { data: pedidos, error, isLoading } = usePedidos();
    const navigate = useNavigate()

    const renderers = {
        total: (rowData) => (
            <span>{Number(rowData.total)?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
        fecha: (rowData) => (
            <span>{formatDate(rowData.fecha)}</span>
        ),
        estado: (rowData) => (
            rowData.estado === "pendiente" && <DataTableEstado className='orange'>Pendiente</DataTableEstado>
        ),

    };
    
    const columns = [
        { field: 'id_pedido', header: 'N° pedido' },
        { field: 'usuario', header: 'Usuario' },
        { field: 'total', header: 'Total' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'metodo_pago', header: 'Metodo Pago' },
        { field: 'estado', header: 'Estado' },
    ];

    return (
        <DataTable
            rows={50} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={pedidos} 
            tableStyle={{ minWidth: '50rem', width: '100%' }}
            loading={isLoading}
            columns={columns}
            renderers={renderers}
            dataKey={'id_pedido'}
            selectable={false}
            onRowClick={(e) => navigate(`/admin/pedidos/${e.data.id_pedido}`)} // usando react-route
        />
    )
}

export default Pedidos