import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/user/userSlice";
import { validateEmail } from "../../utils/validarEmail";
import { LoginButtonRegistrar, LoginContainer, LoginForm, LoginFormWrapper, LoginImagenWrapper, LoginInputWrapper, LoginWrapper } from "../Login/LoginStyles";
import { IMAGES_URL, URL_API } from "../../utils/constants";
import Button from "../../components/UI/Button/Button";
import InputText from "../../components/UI/InputText/InputText";
import useForm from "../../hooks/useForm";
import { useToast } from "../../context/ToastContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { RiArrowRightSLine, RiSendPlaneFill, RiSendPlaneLine } from "react-icons/ri";
import api from "../../api/axios";

const Registrar = () => {
    const toast = useToast(); // Usamos el hook para acceder al Toast
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        nombre: '',
        email: '',
        telefono: '',
        errores: {}
    });  

    const [error, setError] = useState('');
    const [loading, setLoading] = useState()

    // Función para manejar el envío del formulario
    const handleRegistrar = async () => {
        if (validarCampos()) {
            try {
                setLoading(true);
                const response = await api.post(`auth/registrar-solicitud`, {
                    email: formState.email,
                    telefono: formState.telefono,
                    nombre: formState.nombre
                });

                const { success, message } = response.data;
    
                if (success) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Solcitud enviada',
                        detail: `Recibimos sus datos correctamente. En breve nos contactaremos°`,
                        life: 3000,
                    });
                    resetForm();
                } else {
                    alert(`Error: ${message}`);
                    toast.current.show({
                        severity: 'error',
                        summary: 'Solcitud enviada',
                        detail: `Recibimos sus datos correctamente. En breve nos contactaremos°`,
                        life: 3000,
                    });
                }
    
            } catch (error) {
                console.error('Error en el catch:', error);
                toast.current.show({
                    severity: 'error',
                    summary: `Error al enviar la solicitud`,
                    detail: `${error.response.data.message ? error.response.data.message : "Error"}`,
                    life: 3000,
                });
            } finally {
                setLoading(false); // Lo pasamos al finally para asegurarnos que se ejecute siempre
            }
        } else {
        }
    };

    const validarCampos = () => {
        const errores = {};
        if (!formState.nombre.trim()) errores.nombre = 'Este campo es obligatorio';
        if (!formState.telefono.trim()) errores.telefono = 'Este campo es obligatorio';
        if (!formState.email.trim()) {
            errores.email = 'Este campo es obligatorio';
        } else if (!validateEmail(formState.email)) {
            errores.email = 'Email inválido';
        }
        setFormState(prev => ({ ...prev, errores: errores }));
        return Object.keys(errores).length === 0;
    };
    
    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginImagenWrapper $imageUrl={`${IMAGES_URL}/images/login_wrapper.png`}>
                    <img src={`${IMAGES_URL}/images/logos/logotipo-blanco.png`} alt="Logo Neumaticor" />
                </LoginImagenWrapper>
                <LoginFormWrapper>
                    <h2>¿Tenes gomeria o taller? Contactanos y accedé a un precio especial!</h2>
                    <LoginForm>
                        <LoginInputWrapper>
                            <label htmlFor="email">Correo electrónico</label>
                            <InputText 
                                name="email"
                                type={'email'}
                                value={formState.email}
                                onChange={handleFormChange}
                                placeholder="Escriba el email"
                                error={formState.errores.email}
                                keyfilter="email"
                            />
                        </LoginInputWrapper>
                        <LoginInputWrapper>
                            <label htmlFor="nombre">Nombre</label>
                            <InputText 
                                name="nombre"
                                value={formState.nombre}
                                onChange={handleFormChange}
                                placeholder="Escriba el nombre"
                                error={formState.errores.nombre}
                            />
                        </LoginInputWrapper>
                        <LoginInputWrapper>
                            <label htmlFor="telefono">Telefono</label>
                            <InputText 
                                name="telefono"
                                type={'number'}
                                inputMode="numeric"
                                value={formState.telefono}
                                onChange={handleFormChange}
                                placeholder="Escriba el telefono"
                                error={formState.errores.telefono}
                                keyfilter={'int'}
                            />
                        </LoginInputWrapper>
                        {error && <MensajeError><p>{error}</p></MensajeError>}
                    </LoginForm>
                    <Button width='100%' onClick={handleRegistrar} disabled={loading}>
                        {loading ? (
                            <>
                                <ProgressSpinner 
                                    style={{width: '16px', height: '16px'}} 
                                    strokeWidth="2" 
                                    fill="transparent" 
                                    animationDuration=".5s" 
                                />
                                <span>Enviando...</span>
                            </>
                        ) : (
                            <>
                                <span>Enviar</span>
                                <RiSendPlaneLine />
                            </>
                        )}
                    </Button>
                    <LoginButtonRegistrar>
                        <p>¿Ya tenes una cuenta?</p><NavLink to='/login'>Ingresá</NavLink>
                    </LoginButtonRegistrar>
                </LoginFormWrapper>
            </LoginWrapper>
        </LoginContainer>
    );
};

export default Registrar;
