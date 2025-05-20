import React from 'react'
import DataTable from '../../../components/UI/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { usePrecios } from '../../../api/precios/usePrecios';

const ListasPrecios = () => {
    const { data: listas_precios, error, isLoading: loadingListas } = usePrecios();
    console.log(listas_precios);
    
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
        )
    };
    
    const columns = [
        { field: 'nombre', header: 'Lista' },
    ];
    return (
        <DataTable
            rows={50} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={listas_precios} 
            tableStyle={{ minWidth: '50rem', width: '100%' }}
            loading={loadingListas}
            columns={columns}
            renderers={renderers}
            dataKey={'id_lista_precio'}
            selectable={false}
            onRowClick={(e) => navigate(`/admin/listas-precios/${e.data.id_lista_precio}`)} // usando react-route
        />
    )
}

export default ListasPrecios