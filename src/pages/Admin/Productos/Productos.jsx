import React from 'react'
import { useProductosConPrecio } from '../../../hooks/api/useProductos';
import { Column } from 'primereact/column';
import { IMAGES_URL } from '../../../utils/constants';
import DataTable from '../../../components/UI/DataTable/DataTable';

const Productos = () => {
    const { data: productos, error, isLoading } = useProductosConPrecio();

    const renderers = {
        descripcion: (rowData) => (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                <img 
                    src={rowData.img ? `${IMAGES_URL}/productos/${rowData.marca.toLowerCase().replace(/\s+/g, '-')}/${rowData.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`}
                    alt={rowData.descripcion} 
                    style={{ width: '40px', height: '40px', borderRadius: '10px' }}
                />
                <span>{rowData.descripcion}</span>
            </div>
            
        ),
        precio_costo: (rowData) => (
            <span>{rowData.precio?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
    };

    const columns = [
        { field: 'descripcion', header: 'Descripción' },
        { field: 'marca', header: 'Marca' },
        { field: 'modelo', header: 'Modelo' },
        { field: 'vehiculo', header: 'Vehiculo' },
        { field: 'precio_costo', header: 'Costo' },
    ];

    return (
        <DataTable
            paginator 
            rows={50} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={productos} 
            tableStyle={{ minWidth: '50rem', width: '100%' }}
            loading={isLoading}
            columns={columns}
            renderers={renderers}
            dataKey={'id_producto'}
        />
    );
};

export default Productos;
