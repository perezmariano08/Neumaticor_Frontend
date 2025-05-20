import React from 'react'
import useForm from '../../../hooks/useForm';
import { useRegistrarPago } from '../../../api/pagos/UsePagos';
import InputTextWrapper from '../../../components/UI/InputText/InputTextWrapper';
import InputText from '../../../components/UI/InputText/InputText';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useUsuarios } from '../../../api/usuarios/useUsuarios';
import Form from '../../../components/Form/Form';
import Button from '../../../components/UI/Button/Button';
import { PagosMain } from './PagosStyles';

const PagosRegistrar = () => {
    const { data: usuarios, error, isLoading } = useUsuarios();
    
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        monto_pago: '',
        id_usuario: '',
        metodo_pago: '',
        errores: {}
    });

    const registrarPagoMutation = useRegistrarPago();
    
    const registrarPago = async (e) => {
        e.preventDefault();
        const isValid = validarCampos();
        if (!isValid) return; // <-- Importante

        try {
            await registrarPagoMutation.mutateAsync({
                id_usuario: formState.id_usuario,
                metodo_pago: formState.metodo_pago,
                monto_pago: formState.monto_pago,
            }); // <--- POST
            alert("Pago registrado exitosamente");
            resetForm();
        } catch (error) {
            console.error(error.response.data.message || "Error al crear producto");
        }
    };

    const validarCampos = () => {   
        const errores = {}; 
        if (!formState.monto_pago) errores.monto_pago = 'Este campo es obligatorio';
        if (!formState.metodo_pago) errores.metodo_pago = 'Este campo es obligatorio';
        if (!formState.id_usuario) errores.id_usuario = 'Este campo es obligatorio';

        setFormState(prev => ({ ...prev, errores: errores }));

        return Object.keys(errores).length === 0;
    };

    console.log(formState);
    

    return (
        <PagosMain>
            <Form bg={'white-0'} padding={16} titulo="Informacion de producto">
                <InputTextWrapper label="Usuario *">
                    <Dropdown
                        name="id_usuario" // <--- esto es clave
                        value={formState.id_usuario}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={usuarios}
                        optionLabel="usuario"
                        optionValue="id_usuario"
                        placeholder="Seleccione cliente"
                        error={formState.errores.id_usuario}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Metodo de pago *">
                    <Dropdown
                        name="metodo_pago" // <--- esto es clave
                        value={formState.metodo_pago}
                        onChange={handleFormChange} // el value ya es el objeto
                        options={[
                            {metodo_pago: "Efectivo"},
                            {metodo_pago: "Transferencia"},
                        ]}
                        optionLabel="metodo_pago"
                        optionValue="metodo_pago"
                        placeholder="Seleccione metodo de pago"
                        error={formState.errores.metodo_pago}
                    />
                </InputTextWrapper>
                <InputTextWrapper label="Monto *">
                    <InputText
                        name="monto_pago"
                        value={formState.monto_pago}
                        onChange={handleFormChange}
                        keyfilter={'int'}
                        placeholder="Ingrese el monto"
                        error={formState.errores.monto_pago}
                    />
                </InputTextWrapper>
            </Form>
            <Button onClick={registrarPago} disabled={registrarPagoMutation.isLoading}>
                {registrarPagoMutation.isLoading ? 'Registrando...' : 'Registrar pago'}
            </Button>
        </PagosMain>
    )
}

export default PagosRegistrar