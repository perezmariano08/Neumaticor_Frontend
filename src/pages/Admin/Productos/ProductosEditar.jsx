import React, { useState } from 'react'
import DataTable from '../../../components/UI/DataTable/DataTable';
import ProductosMenu from './ProductosMenu';
import Form from '../../../components/Form/Form';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import InputText from '../../../components/UI/InputText/InputText';
import useForm from '../../../hooks/useForm';
import { ProductosCrearMain } from './ProductosAdminStyles';
import { useActualizarProducto, useCrearProducto, useMarcas, useProducto } from '../../../api/productos/useProductos';
import Button from '../../../components/UI/Button/Button';
import {useToast} from '../../../context/ToastContext'
import { useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RiArrowRightSLine } from 'react-icons/ri';

const ProductosEditar = () => { 
    const id_producto = parseInt(useParams().id_producto, 10);
    const { data: marcas } = useMarcas();
    const { data: producto = [], error, isLoading } = useProducto(id_producto);
    const [productoOriginal, setProductoOriginal] = useState(null);
    const [loading, setLoading] = useState(false)

    const estado = [
        {estado: "A", label: "Activo"},
        {estado: "I", label: "Inactivo"}
    ]

    const stock = [
        {stock: "S", label: "Si"},
        {stock: "N", label: "No"}
    ]

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        descripcion: producto.descripcion,
        id_marca: producto.id_marca,
        modelo: producto.modelo,
        vehiculo: producto.vehiculo,
        destacado: producto.destacado,
        oferta: producto.oferta,
        precio_oferta: producto.precio_oferta,
        stock: producto.stock,
        estado: producto.estado,
        errores: {}
    });  

    // Llenar el formulario cuando llegan los datos del producto
    React.useEffect(() => {
        if (producto?.id_producto) {
            const productoInicial = {
                descripcion: producto.descripcion || '',
                id_marca: producto.id_marca || '',
                modelo: producto.modelo || '',
                vehiculo: producto.vehiculo || '',
                destacado: producto.destacado || '',
                oferta: producto.oferta || '',
                precio_oferta: producto.precio_oferta || '',
                stock: producto.stock || '',
                estado: producto.estado || '',
            };
            setFormState(prev => ({ ...prev, ...productoInicial }));
            setProductoOriginal(productoInicial); // <-- Guardamos la referencia original
        }
    }, [producto, setFormState]);    

    const hayCambios = () => {
        if (!productoOriginal) return false; // Aún no cargó

        return Object.keys(productoOriginal).some(key => {
            return productoOriginal[key] !== formState[key];
        });
    };


    const toast = useToast();

    const actualizarProductoMutation = useActualizarProducto();
    const handleActualizar = async () => {
        try {
            setLoading(true)
            await actualizarProductoMutation.mutateAsync({
                datos: {
                    id_producto: id_producto,
                    descripcion: formState.descripcion,
                    modelo: formState.modelo,
                    vehiculo: formState.vehiculo,
                    id_marca: formState.id_marca,
                    estado: formState.estado,
                    stock: formState.stock,
                    oferta: formState.oferta,
                    precio_oferta: formState.precio_oferta,
                    destacado: formState.destacado
                }
            });
            setLoading(false)
            toast.current.show({
                severity: 'success',
                summary: "Producto actualizado",
                detail: `Se ha actualizado correctamente el producto`,
                life: 3000,
            });        
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message || "Error al actualizar");
        }
    };

    const validarCampos = () => {   
        const errores = {}; 
        if (!formState.descripcion.trim()) errores.descripcion = 'Este campo es obligatorio';
        if (!formState.modelo.trim()) errores.modelo = 'Este campo es obligatorio';
        if (!formState.vehiculo.trim()) errores.vehiculo = 'Este campo es obligatorio';
        if (!formState.id_marca) errores.id_marca = 'Este campo es obligatorio';

        setFormState(prev => ({ ...prev, errores: errores }));

        return Object.keys(errores).length === 0;
    };

    return (
        <ProductosCrearMain>
            <Form bg={'white-0'} padding={16} titulo="Informacion de producto">
                <InputTextWrapper label="Descripción *">
                    <InputText 
                        name="descripcion"
                        value={formState.descripcion}
                        onChange={handleFormChange}
                        placeholder="Escriba la descripcion"
                        error={formState.errores.descripcion}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Modelo *">
                    <InputText 
                        name="modelo"
                        value={formState.modelo}
                        onChange={handleFormChange}
                        placeholder="Escriba el modelo"
                        error={formState.errores.modelo}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Vehiculo *">
                    <InputText 
                        name="vehiculo"
                        value={formState.vehiculo}
                        onChange={handleFormChange}
                        placeholder="Escriba el vehiculo"
                        error={formState.errores.vehiculo}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Marca *">
                    <Dropdown
                        name="id_marca" // <--- esto es clave
                        value={formState.id_marca}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={marcas}
                        optionLabel="marca"
                        optionValue="id_marca"
                        placeholder="Seleccione marca"
                        error={formState.errores.id_marca}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Estado *">
                    <Dropdown
                        name="estado" // <--- esto es clave
                        value={formState.estado}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={estado}
                        optionLabel="label"
                        optionValue="estado"
                        placeholder="Seleccione estado"
                        error={formState.errores.estado}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="¿Tiene stock? *">
                    <Dropdown
                        name="stock" // <--- esto es clave
                        value={formState.stock}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={stock}
                        optionLabel="label"
                        optionValue="stock"
                        placeholder="Seleccione stock"
                        error={formState.errores.stock}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="¿Está en oferta? *">
                    <Dropdown
                        name="oferta"
                        value={formState.oferta}
                        onChange={handleFormChange}
                        options={[
                            { label: 'Sí', oferta: 'S' },
                            { label: 'No', oferta: 'N' }
                        ]}
                        optionLabel="label"
                        optionValue="oferta"
                        placeholder="Seleccione una opción"
                        error={formState.errores.oferta}
                    />
                </InputTextWrapper>
                {formState.oferta === 'S' && (
                    <InputTextWrapper label="Precio de oferta">
                        <InputText 
                            name="precio_oferta"
                            value={formState.precio_oferta || ''}
                            onChange={handleFormChange}
                            placeholder="Escriba el precio de oferta"
                            error={formState.errores.precio_oferta}
                        />
                    </InputTextWrapper>
                )}
            </Form>
            <Button onClick={handleActualizar} disabled={loading || !hayCambios()}>
                {loading ? (
                    <>
                        <ProgressSpinner 
                            style={{width: '16px', height: '16px'}} 
                            strokeWidth="2" 
                            fill="transparent" 
                            animationDuration=".5s" 
                        />
                        Editando producto
                    </>
                    ) : (
                    <>
                        Editar producto 
                    </>
                    )}
            </Button>
        </ProductosCrearMain>
        
    );
};

export default ProductosEditar;
