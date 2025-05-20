import React from 'react'
import { Column } from 'primereact/column';
import { IMAGES_URL } from '../../../utils/constants';
import DataTable from '../../../components/UI/DataTable/DataTable';
import { DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import { formatDate } from '../../../utils/formatDate';
import { useSolicitudes, useUsuarios } from '../../../api/usuarios/useUsuarios';

const Usuarios = () => {
    const { data: usuarios, error, isLoading } = useUsuarios();
    const { data: solicitudes, error: errorSolicitudes, isLoading: loadingSolicitudes } = useSolicitudes();
    
    const navigate = useNavigate()
    const renderers = {
        descripcion: (rowData) => (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                <img 
                    src={rowData.img ? `${IMAGES_URL}/productos/${rowData.marca.toLowerCase()}/${rowData.vehiculo.toLowerCase()}/${rowData.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`}
                    alt={rowData.descripcion} 
                    style={{ width: '40px', height: '40px', borderRadius: '10px' }}
                />
                <span>{rowData.descripcion}</span>
            </div>
            
        ),
        precio_costo: (rowData) => (
            <span>{rowData.precio?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
        ),
        estado: (rowData) => (
            rowData.estado === "A" ? <DataTableEstado className='green'>Activo</DataTableEstado> : <DataTableEstado className='red'>Inactivo</DataTableEstado>
        ),
        nombre_lista: (rowData) => (
            <NavLink to={'/admin/dashboard'}>
                {rowData.nombre_lista}
            </NavLink>        
        ),
        fecha_creacion: (rowData) => (
            <span>{formatDate(rowData.fecha_creacion)}</span>
        )
    };

    const renderersSolicitudes = {
        fecha_solicitud: (rowData) => (
            <span>{formatDate(rowData.fecha_solicitud)}</span>
        )
    };

    const columns = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'email', header: 'Email' },
        { field: 'nombre_lista', header: 'Lista Precio' },
        { field: 'rol', header: 'Rol' },
        { field: 'estado', header: 'Estado' },
        { field: 'fecha_creacion', header: 'Fecha Alta' },
    ];

    const columnsSolicitudes = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'email', header: 'Email' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'fecha_solicitud', header: 'Fecha' },
    ];

    return (
        <>
            <Button onClick={() => navigate('/admin/usuarios/registrar')}>Registrar nuevo usuario</Button>
            <DataTable
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={usuarios} 
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={isLoading}
                columns={columns}
                renderers={renderers}
                dataKey={'id_usuario'}
            />
            <DataTable
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={solicitudes} 
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={loadingSolicitudes}
                columns={columnsSolicitudes}
                renderers={renderersSolicitudes}
                dataKey={'id_solicitud'}
            />
            
        </>
    );
};

export default Usuarios;
