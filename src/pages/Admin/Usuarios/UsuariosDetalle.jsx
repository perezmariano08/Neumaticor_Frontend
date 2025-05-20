import React from 'react'
import { useParams } from 'react-router-dom';
import { usePedidoDetalleUsuario, usePedidosUsuario } from '../../../api/pedidos/usePedidos';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { formatDate } from '../../../utils/formatDate';

const UsuariosDetalle = () => {
    const id_usuario = parseInt(useParams().id_usuario, 10);
    const { data: pedidos, error, isLoading } = usePedidosUsuario(id_usuario);
    const { data: pedidosDetalle, error: errorPedidosDetalle, isLoading: loadingPedidosDetalle } = usePedidoDetalleUsuario(id_usuario);
    console.log(pedidos);
    console.log(pedidosDetalle);
    
    const columns = [
        // { field: 'acciones', header: '' },
        { field: 'id_pedido', header: 'N° pedido' },
        { field: 'total', header: 'Total' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'metodo_pago', header: 'Metodo Pago' },
        { field: 'estado', header: 'Estado' },
        { field: 'codigo_postal', header: 'Codigo Postal' },
        { field: 'direccion', header: 'Direccion' },
    ];

    const renderers = {
            // acciones: (rowData) => (
            //     <DataTableAccionesWrappe>
            //         <span className='orange' onClick={(e) => { 
            //             e.stopPropagation(); // Evita que se dispare el onRowClick
            //             setPedidoSeleccionado(rowData);
            //             setFormState({
            //                 estado: rowData.estado || ''
            //             });
            //             setVisible(true); 
            //         }}><BiEdit/></span>
            //     </DataTableAccionesWrappe>
            // ),        
            total: (rowData) => (
                <span>{Number(rowData.total)?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
            ),
            fecha: (rowData) => (
                <span>{formatDate(rowData.fecha)}</span>
            ),
            estado: (rowData) => {
                switch (rowData.estado) {
                    case 'P':
                        return <DataTableEstado className='orange'>Pendiente</DataTableEstado>;
                    case 'C':
                        return <DataTableEstado className='blue'>Confirmado</DataTableEstado>;
                    case 'F':
                        return <DataTableEstado className='green'>Finalizado</DataTableEstado>;
                }
            }        
    
        };
        

    return (
        <div>
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
        </div>
    )
}

export default UsuariosDetalle