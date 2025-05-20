import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import { LoginContainer, LoginWrapper, LoginForm, LoginInputWrapper, MensajeError, LoginImagenWrapper, LoginFormWrapper, LoginButtonRegistrar } from './LoginStyles';
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch
import { loginSuccess } from '../../redux/user/userSlice';
import Button from '../../components/UI/Button/Button';
import InputText from '../../components/UI/InputText/InputText';
import { validateEmail } from '../../utils/validarEmail';
import Password from '../../components/UI/Password/Password';
import { IMAGES_URL } from '../../utils/constants';
import useForm from '../../hooks/useForm';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RiArrowRightSLine } from 'react-icons/ri';
import axios from 'axios';
import { useAuthLogin } from '../../api/auth/useAuth';

const Login = () => {
   // Redirigir a home en caso de que un usuario este logueado
   const user = useSelector((state) => state.user.user);
   if (user) {
      return <Navigate to="/" />;
   }

   // useEffect(() => {
   //    /* Inicializa el cliente de Google */
   //    window.google.accounts.id.initialize({
   //       client_id: '100624139882-rcl71eblremdlmsjlpd4455v4q31prsl.apps.googleusercontent.com',
   //       callback: handleGoogleLogin,
   //    });

   //    window.google.accounts.id.renderButton(
   //       document.getElementById("google-login-button"),
   //       { theme: "outline", size: "large" } // Personaliza el botón
   //       );
   // }, []);

   // Maneja la respuesta de Google y envía el token a tu API
   const handleGoogleLogin = async (response) => {
      const googleToken = response.credential;  // Obtén el token de Google
      try {
         // Realiza la solicitud POST con el token
         const res = await axios.post('http://localhost:3001/api/auth/google', {
            token: googleToken,  // Envía el token en el cuerpo de la solicitud
         });

         if (res.data.success) {
            // Si el login es exitoso, guarda el usuario en Redux
            
            dispatch(loginSuccess(res.data.user));
            if (res.data.user.isAdmin) {
                  navigate('/admin/usuarios');
            } else {
                  navigate('/');
            }
         } else {
            // Si el login falla, muestra el mensaje de error
            console.error(res.data.message);
         }
      } catch (error) {
         console.error("Error de autenticación:", error);
      }
   };

   // Manejo del form
   const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
      email: '',
      password: '',
      errores: {}
   });

   const navigate = useNavigate();  // Inicializa el hook useNavigate
   const dispatch = useDispatch(); // Usar useDispatch
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const { mutateAsync: loginUser, isLoading, isError, error: authError } = useAuthLogin();
   
   
   // Función para manejar el envío del formulario
   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validarCampos();
      if (!isValid) return; // <-- Importante
      try {
         setLoading(true)
         // Aquí ejecutamos la función de login
         const response = await loginUser({ email: formState.email, password: formState.password });
         if (response.success) {
            // Almacenar el usuario en Redux y redirigir
            dispatch(loginSuccess(response.user));
            if (response.user.isAdmin) {
               navigate('/admin/usuarios')
            } else {
               navigate('/')
               
            }
            setLoading(false)
         } else {
            setLoading(false)
            setError(response.message);  // Mostrar el mensaje que viene del backend
         }
      } catch (error) {
         setLoading(false)
         setError('Hubo un error con la conexión');
      }
   };

   // Funcion para validar campos
   const validarCampos = () => {
      const errores = {};
      if (!formState.email.trim()) {
         errores.email = 'Este campo es obligatorio';
      } else if (!validateEmail(formState.email)) {
         errores.email = 'Email inválido';
      }
      if (!formState.password.trim()) errores.password = 'Este campo es obligatorio';
      setFormState(prev => ({ ...prev, errores: errores }));
      return Object.keys(errores).length === 0;
   };   
   
   return (
      <LoginContainer>
         <LoginWrapper>
            <LoginImagenWrapper $imageUrl={`${IMAGES_URL}/images/login_wrapper.webp`}>
               <img src={`${IMAGES_URL}/images/logos/logotipo-blanco.png`} alt={"Neumaticor - Fate"} />
            </LoginImagenWrapper>
            <LoginFormWrapper>
               <h2>Iniciar sesión</h2>
               <LoginForm onSubmit={handleSubmit}>
                  <LoginInputWrapper>
                     <label htmlFor="email">Correo electrónico</label>
                     <InputText 
                        name="email"
                        type={'email'}
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="Ingrese su correo"
                        error={formState.errores.email}
                     />
                  </LoginInputWrapper>
                  <LoginInputWrapper>
                     <label htmlFor="password">Contraseña</label>
                     <Password 
                        name="password"
                        value={formState.password} 
                        type='password'
                        onChange={handleFormChange}
                        feedback={false}
                        toggleMask 
                        placeholder="Ingrese su contraseña"
                        error={formState.errores.password}
                     />
                  </LoginInputWrapper>
                  {error && <MensajeError><p>{error}</p></MensajeError>}
                  <Button type="submit" disabled={loading}>
                     {loading ? (
                        <>
                           <ProgressSpinner 
                              style={{width: '16px', height: '16px'}} 
                              strokeWidth="2" 
                              fill="transparent" 
                              animationDuration=".5s" 
                           />
                           Ingresando 
                        </>
                     ) : (
                        <>
                           Ingresar 
                           <RiArrowRightSLine />
                        </>
                     )}
                  </Button>
                  <LoginButtonRegistrar>
                     <p>¿No tenes una cuenta?</p><NavLink to='/registrar'>Registrate</NavLink>
                  </LoginButtonRegistrar>
               </LoginForm>
               {/* <div id="google-login-button">
                  <a>
                     Iniciar sesión con Google
                  </a>
               </div> Aquí se renderiza el botón de Google

                */}

               
            </LoginFormWrapper>
         </LoginWrapper>
      </LoginContainer>
   );
};

export default Login;
