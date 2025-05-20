import React, { useState } from 'react'
import DataTable from '../../../components/UI/DataTable/DataTable';
import ProductosMenu from './ProductosMenu';
import Form from '../../../components/Form/Form';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import InputText from '../../../components/UI/InputText/InputText';
import useForm from '../../../hooks/useForm';
import { ProductosCrearMain } from './ProductosAdminStyles';
import { useCrearProducto, useMarcas } from '../../../api/productos/useProductos';
import Button from '../../../components/UI/Button/Button';
import {useToast} from '../../../context/ToastContext'

const ProductosCrear = () => {    
    const { data: marcas } = useMarcas();
    
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
        descripcion: '',
        id_marca: '',
        modelo: '',
        vehiculo: '',
        destacado: '',
        oferta: null,
        precio_oferta: null,
        stock: 'S',
        estado: 'A',
        errores: {}
    });      

    const toast = useToast();
    const crearProductoMutation = useCrearProducto();

    const handleCrearProducto = async (e) => {
        e.preventDefault();
        const isValid = validarCampos();
        if (!isValid) return; // <-- Importante

        try {
            await crearProductoMutation.mutateAsync({
                descripcion: formState.descripcion,
                id_marca: formState.id_marca,
                modelo: formState.modelo,
                vehiculo: formState.vehiculo,
                oferta: formState.oferta,
                stock: formState.stock,
                estado: formState.estado
            }); // <--- POST
            alert("Producto creado exitosamente");
            resetForm();
        } catch (error) {
            console.error(error.response.data.message || "Error al crear producto");
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
            <Button onClick={handleCrearProducto} disabled={crearProductoMutation.isLoading}>
                {crearProductoMutation.isLoading ? 'Creando...' : 'Crear producto'}
            </Button>
        </ProductosCrearMain>
        
    );
};

export default ProductosCrear;
