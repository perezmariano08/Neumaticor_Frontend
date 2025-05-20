import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CuentaContainer, CuentaPerfilWrapper, CuentaWrapper } from './CuentaStyles';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import CuentaMenu from './CuentaMenu';
import Form from '../../components/Form/Form';
import InputTextWrapper from '../../components/UI/InputText/InputTextWrapper';
import useForm from '../../hooks/useForm';
import InputText from '../../components/UI/InputText/InputText';
import { usePedidoDetalleUsuario, usePedidosUsuario } from '../../api/pedidos/usePedidos';

const Cuenta = () => {
    
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux
    const { data: pedidos, error, isLoading } = usePedidosUsuario(user?.id_usuario);
    const { data: pedidosDetalle, error:errorPedidosDetalle, isLoading: loadingPedidosDetalle } = usePedidoDetalleUsuario(user?.id_usuario);
    const [formErrors, setFormErrors] = useState({});
    
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        nombre_visible: user.nombre_visible
    }); 


    return (
        <CuentaContainer>
            <CuentaWrapper>
                <CuentaMenu/>
                <CuentaPerfilWrapper>
                    <Form>
                        <InputTextWrapper label={'Nombre'}>
                            <InputText 
                                name="nombre"
                                value={formState.nombre}
                                onChange={handleFormChange}
                                placeholder="Escriba el nombre"
                                error={formErrors.nombre}
                                disabled
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={'Apellido'}>
                            <InputText 
                                name="apellido"
                                value={formState.apellido}
                                onChange={handleFormChange}
                                placeholder="Escriba el apellido"
                                error={formErrors.apellido}
                                disabled
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={'Email'}>
                            <InputText 
                                name="email"
                                value={formState.email}
                                onChange={handleFormChange}
                                placeholder="Escriba el email"
                                error={formErrors.email}
                                disabled
                            />
                        </InputTextWrapper>
                        {
                            formState.nombre_visible && <InputTextWrapper label={'Nombre visible'}>
                            <InputText 
                                name="nombre_visible"
                                value={formState.nombre_visible}
                                onChange={handleFormChange}
                                placeholder="Escriba el email"
                                error={formErrors.nombre_visible}
                                disabled
                            />
                        </InputTextWrapper>
                        }
                        
                    </Form>
                </CuentaPerfilWrapper>
            </CuentaWrapper>
        </CuentaContainer>
    )
}

export default Cuenta