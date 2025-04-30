import React, { useState } from 'react'
import useForm from '../../../hooks/useForm';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import InputText from '../../../components/UI/InputText/InputText';
import Button from '../../../components/UI/Button/Button';
import Form from '../../../components/Form/Form';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { usePrecios } from '../../../hooks/api/usePrecios';
import { useToast } from '../../../context/ToastContext';
import axios from 'axios';
import { URL_API } from '../../../utils/constants';
import { useSelector } from 'react-redux';
import { useMarcas, useProductos } from '../../../hooks/api/useProductos';
import { confirmDialog } from 'primereact/confirmdialog';


const Calculadora = () => {
    const toast = useToast(); // Usamos el hook para acceder al Toast
    const [loading, setLoading] = useState()
    const { data: listas_precios, error, isLoading: loadingListas } = usePrecios();
    const { data: productos, error: errorProductos, isLoading: loadingProductos } = useProductos();
    const { data: marcas, error: errorMarcas, isLoading: loadingMarcas } = useMarcas();
    // const marcas = [...new Set(productos?.map(producto => producto.marca))];


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    
    
    const token = useSelector((state) => state.user.token);

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        porcentaje: '',
        id_lista_precio: '',
        marca: ''
    });   

    

    const [formErrors, setFormErrors] = useState({});

    const confirmarYEnviar = () => {
        if (!validarCampos()) {
            return;
        }

        const listaSeleccionada = listas_precios?.find(
            (lista) => lista.id_lista_precio === formState.id_lista_precio
        );
    
        const nombreLista = listaSeleccionada ? listaSeleccionada.nombre : 'Lista desconocida';

        const marcaSeleccionada = marcas?.find(
            (m) => m.id_marca === formState.marca
        );
    
        const nombreMarca = marcaSeleccionada ? marcaSeleccionada.marca : 'Marca desconocida';

        confirmDialog({
            message: `¿Estás seguro de que quieres aplicar el ${formState.porcentaje}% en${formState.marca ? ` los productos de la marca "${nombreMarca}"` : ' todos los productos'} de la lista "${nombreLista}"?`,
            header: 'Confirmación',
            accept: handleSubmit
        });
    };
    
    const handleSubmit = async () => {
        if (validarCampos()) {
            try {
                setLoading(true);
                
                const response = await axios.post(`${URL_API}precios/aplicar-porcentaje`, {
                    id_lista_precio: formState.id_lista_precio,
                    porcentaje: formState.porcentaje,
                    marca: formState.marca
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
                    }
                });
    
                const { success, message } = response.data;
    
                if (success) {
                    toast.current.show({
                        severity: 'success',
                        summary: message,
                        detail: `Se ha actualizado correctamente los productos de la lista de precio`,
                        life: 3000,
                    });
                    resetForm();
                } else {
                    alert(`Error: ${message}`);
                }
    
            } catch (error) {
                console.error('Error en el catch:', error);
                alert('Error al registrar el usuario');
            } finally {
                setLoading(false); // Lo pasamos al finally para asegurarnos que se ejecute siempre
            }
        } else {
        }
    };

    const validarCampos = () => {        
        const errores = {};
        if (!formState.id_lista_precio) errores.id_lista_precio = 'Este campo es obligatorio';

        // Validar Porcentaje
        if (!formState.porcentaje.trim()) {
            errores.porcentaje = 'Este campo es obligatorio';
        } else if (formState.porcentaje > 100 || formState.porcentaje < -100 ) {
            errores.porcentaje = 'El porcentaje no puede ser menor a -100 ni mayor a 100';
        }   

        setFormErrors(errores);
        return Object.keys(errores).length === 0;
    };


    return (
        <>
            <Form>
                <InputTextWrapper label="Lista de precio *">
                    <Dropdown
                        name="id_lista_precio" // <--- esto es clave
                        value={formState.id_lista_precio}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={listas_precios}
                        optionLabel="nombre"
                        optionValue="id_lista_precio"
                        placeholder="Seleccione marca"
                        error={formErrors.id_lista_precio}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Marca (opcional)">
                    <Dropdown
                        name="marca" // <--- esto es clave
                        value={formState.marca}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={marcas}
                        optionLabel="marca"
                        optionValue="id_marca"
                        placeholder="Seleccione marca"
                        error={formErrors.marca}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Porcentaje *">
                    <InputText 
                        type={'number'}
                        min={-100}
                        max={100}
                        name="porcentaje"
                        value={formState.porcentaje}
                        onChange={handleFormChange}
                        placeholder="Ingrese el porcentaje"
                        error={formErrors.porcentaje}
                        keyfilter={'int'}
                    />
                </InputTextWrapper>
            </Form>
            <Button onClick={confirmarYEnviar}>Aplicar porcentaje</Button>
        </>
    )
}

export default Calculadora