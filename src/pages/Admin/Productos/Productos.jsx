import { useState } from 'react'
import { IMAGES_URL } from '../../../utils/constants';
import DataTable from '../../../components/UI/DataTable/DataTable';
import ProductosMenu from './ProductosMenu';
import { DataTableAccionesWrapper, DataTableEstado } from '../../../components/UI/DataTable/DataTableStyles';
import InputText from '../../../components/UI/InputText/InputText';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useMarcas, useProductos } from '../../../api/productos/useProductos';
import { BiEdit } from 'react-icons/bi';
import { ProductosFiltros } from './ProductosAdminStyles';
import { FilterMatchMode } from 'primereact/api';

const Productos = () => {
    const navigate = useNavigate()
    const { data: productos = [], error, isLoading } = useProductos();
    const { data: marcas = [], isLoading: loadingMarcas, error: errorMarcas } = useMarcas();
    console.log(productos);
    
    const marcasConTodas = [{ id_marca: '', marca: 'Todas las marcas' }, ...marcas];
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [busqueda, setBusqueda] = useState('') 

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        id_marca: '',
        apellido: '',
        password: '',
        email: '',
        id_lista_precio: '',
        id_rol: 2,
        errores: {}
    });   

    const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos');
    // Filtrar productos según estado seleccionado
    const productosFiltrados = productos?.filter((p) => {
        const coincideEstado = estadoSeleccionado === 'todos' || p.estado === estadoSeleccionado;
        const coincideMarca = formState.id_marca === '' || p.id_marca === formState.id_marca;
        return coincideEstado && coincideMarca;
    });


    const renderers = {
        acciones: (rowData) => (
            <DataTableAccionesWrapper>
                <span className='orange' onClick={(e) => { 
                    e.stopPropagation(); // Evita que se dispare el onRowClick
                    navigate(`/admin/productos/editar/${rowData.id_producto}`)
                }}><BiEdit/></span>
            </DataTableAccionesWrapper>
        ),  
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
        estado: (rowData) => (
            rowData.estado === "A" ? <DataTableEstado className='green'>Activo</DataTableEstado> : <DataTableEstado className='red'>Inactivo</DataTableEstado>
        ),
    };

    const columns = [
        { field: 'acciones', header: '' },
        { field: 'descripcion', header: 'Descripción', filter: true},
        { field: 'marca', header: 'Marca', filter: true , style:{maxWidth: '150px'}},
        { field: 'modelo', header: 'Modelo', filter: true },
        { field: 'vehiculo', header: 'Vehiculo', filter: true },
        { field: 'estado', header: 'Estado'},
    ];

    const [filters, setFilters] = useState({
        descripcion: { value: null, matchMode: FilterMatchMode.CONTAINS },
        marca: { value: null, matchMode: FilterMatchMode.CONTAINS },
        modelo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        vehiculo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    return (
        <>
            <ProductosMenu 
                productos={productos} 
                estadoSeleccionado={estadoSeleccionado}
                setEstadoSeleccionado={setEstadoSeleccionado}
            />
            <Button onClick={()=> navigate('/admin/productos/crear')}>
                <span>Nuevo producto</span>
            </Button>
            <DataTable
                paginator 
                rows={50} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={productosFiltrados} 
                tableStyle={{ minWidth: '50rem', width: '100%' }}
                loading={isLoading}
                columns={columns}
                renderers={renderers}
                dataKey={'id_producto'}
                filters={filters}
                globalFilterFields={['descripcion', 'estado']} 
                filterDisplay="row" 
            />
            
        </>
        
    );
};

export default Productos;
