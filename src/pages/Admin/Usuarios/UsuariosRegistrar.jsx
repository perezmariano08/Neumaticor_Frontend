import React, { useState } from 'react'
import useForm from '../../../hooks/useForm';
import InputText from '../../../components/UI/InputText/InputText';
import Password from '../../../components/UI/Password/Password';
import Button from '../../../components/UI/Button/Button';
import { validateEmail } from '../../../utils/validarEmail';
import axios from 'axios';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import Form from '../../../components/Form/Form';
import { URL_API } from '../../../utils/constants';
import { confirmDialog } from 'primereact/confirmdialog';
import { useToast } from '../../../context/ToastContext';
import { usePrecios } from '../../../api/precios/usePrecios'
import { useRoles } from '../../../api/usuarios/useUsuarios';
import api from '../../../api/axios';

const UsuariosRegistrar = () => {
    const toast = useToast(); // Usamos el hook para acceder al Toast
    
    const { data: listas_precios, error, isLoading: loadingListas } = usePrecios();
    const { data: roles, error: errorRoles, isLoading: loadingRoles } = useRoles();
    const token = useSelector((state) => state.user.token);
    
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setLoading] = useState();
    
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        nombre: '',
        apellido: '',
        password: '',
        email: '',
        id_lista_precio: '',
        id_rol: 2,
        nombre_visible: null
    });    

    console.log(formState);
    
    const openConfirm = () => {
        if (!validarCampos()) {
            console.log('Formulario con errores');
            return;
        }

        confirmDialog({
            message: `¿Estás seguro que quieres crear el usuario?`,
            header: 'Crear usuario',
            accept: handleRegistrar
        });
    };

    const validarCampos = () => {
        const errores = {};
    
        if (!formState.nombre.trim()) errores.nombre = 'Este campo es obligatorio';
        if (!formState.apellido.trim()) errores.apellido = 'Este campo es obligatorio';
        if (!formState.id_lista_precio) errores.id_lista_precio = 'Este campo es obligatorio';
        if (!formState.id_rol) errores.id_rol = 'Este campo es obligatorio';
        

        // Validar Email
        if (!formState.email.trim()) {
            errores.email = 'Este campo es obligatorio';
        } else if (!validateEmail(formState.email)) {
            errores.email = 'Email inválido';
        }
    
        setFormErrors(errores);
    
        return Object.keys(errores).length === 0;
    };

    const handleRegistrar = async () => {
        if (validarCampos()) {
            try {
                setLoading(true);
    
                const response = await api.post(`auth/register`, {
                    email: formState.email,
                    password: formState.password,
                    nombre: formState.nombre,
                    apellido: formState.apellido,
                    id_lista_precio: formState.id_lista_precio,
                    id_rol: formState.id_rol,
                    nombre_visible: formState.nombre_visible
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
                        detail: `Se ha creado correctamente el usuario`,
                        life: 3000,
                    });
                    resetForm();
                } else {
                    alert(`Error: ${message}`);
                    toast.current.show({
                        severity: 'error',
                        summary: `Error al crear el usuario`,
                        detail: `${error.response.data.message ? error.response.data.message : "Error"}`,
                        life: 3000,
                    });
                }
    
            } catch (error) {
                console.error('Error en el catch:', error);
                toast.current.show({
                    severity: 'error',
                    summary: `Error al crear el usuario`,
                    detail: `${error.response.data.message ? error.response.data.message : "Error"}`,
                    life: 3000,
                });
            } finally {
                setLoading(false); // Lo pasamos al finally para asegurarnos que se ejecute siempre
            }
        } else {
            console.log('Formulario con errores');
        }
    };
    
    

    return (
        <>
            <Form>
                <InputTextWrapper label="Nombre *">
                    <InputText 
                        name="nombre"
                        value={formState.nombre}
                        onChange={handleFormChange}
                        placeholder="Escriba el nombre"
                        error={formErrors.nombre}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Apellido *">
                    <InputText 
                        name="apellido"
                        value={formState.apellido}
                        onChange={handleFormChange}
                        placeholder="Escriba el apellido"
                        error={formErrors.apellido}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Email *">
                    <InputText 
                        name="email"
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="Escriba el email"
                        error={formErrors.email}
                        keyfilter="email"
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Nombre visible (Opcional)">
                    <InputText 
                        name="nombre_visible"
                        value={formState.nombre_visible}
                        onChange={handleFormChange}
                        placeholder="Escriba el nombre visible"
                        error={formErrors.nombre_visible}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Lista de precio *">
                    <Dropdown
                        name="id_lista_precio" // <--- esto es clave
                        value={formState.id_lista_precio}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={listas_precios}
                        optionLabel="nombre"
                        optionValue="id_lista_precio"
                        placeholder="Seleccione lista de precio"
                        error={formErrors.id_lista_precio}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Rol *">
                    <Dropdown
                        name="id_rol" // <--- esto es clave
                        value={formState.id_rol}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={roles}
                        optionLabel="rol"
                        optionValue="id_rol"
                        placeholder="Seleccione rol"
                        error={formErrors.id_rol}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Contraseña *">
                    <Password 
                        name="password"
                        value={formState.password} 
                        onChange={handleFormChange} 
                        feedback={false}
                        toggleMask 
                        placeholder="Ingrese la contraseña"
                        error={formErrors.password}
                    />
                </InputTextWrapper>
            </Form>
            <Button disabled={isLoading} onClick={openConfirm}>Registrar usuario</Button>
        </>
        
    )
}

export default UsuariosRegistrar