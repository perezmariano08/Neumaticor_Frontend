import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import { LoginContainer, LoginWrapper, LoginForm, LoginInputWrapper, MensajeError, LoginImagenWrapper, LoginFormWrapper, LoginButtonRegistrar } from './LoginStyles';
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch
import { loginSuccess } from '../../redux/user/userSlice';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useAuthLogin } from '../../hooks/api/useAuth';
import InputText from '../../components/UI/InputText/InputText';
import { validateEmail } from '../../utils/validarEmail';
import Password from '../../components/UI/Password/Password';
import { IMAGES_URL } from '../../utils/constants';

const Login = () => {
   // Redirigir a home en caso de que un usuario este logueado
   const user = useSelector((state) => state.user.user);
   if (user) {
      return <Navigate to="/" />;
   }

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();  // Inicializa el hook useNavigate
   const dispatch = useDispatch(); // Usar useDispatch
   const { mutateAsync: loginUser, isLoading, isError, error: authError } = useAuthLogin();
   
   // Función para manejar el envío del formulario
   const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validarCampos();
      if (!isValid) return; // <-- Importante

      try {
         // Aquí ejecutamos la función de login
         const response = await loginUser({ email, password });
         if (response.success) {
            // Almacenar el usuario en Redux y redirigir
            dispatch(loginSuccess(response.user));
            if (response.user.isAdmin) {
               navigate('/admin/usuarios')
            } else {
               navigate('/')
            }
            
         } else {
            setError(response.message);  // Mostrar el mensaje que viene del backend
         }
      } catch (error) {
         setError('Hubo un error con la conexión');
      }
   };

   

   const [formErrors, setFormErrors] = useState({});

   const validarCampos = () => {
      const errores = {};

      console.log(email);
      
      if (!email.trim()) {
         errores.email = 'Este campo es obligatorio';
      } else if (!validateEmail(email)) {
         errores.email = 'Email inválido';
      }
      
      if (!password.trim()) errores.password = 'Este campo es obligatorio';

      setFormErrors(errores);

      return Object.keys(errores).length === 0;
   };

   return (
      <LoginContainer>
         <LoginWrapper>
            <LoginImagenWrapper imageUrl={`${IMAGES_URL}/images/login_wrapper.png`}>
               <img src={`${IMAGES_URL}/images/logos/logotipo-blanco.png`} alt="" srcset="" />
            </LoginImagenWrapper>
            <LoginFormWrapper>
               <h2>Iniciar sesión</h2>
               
               <LoginForm onSubmit={handleSubmit}>
                  <LoginInputWrapper>
                     <label htmlFor="email">Correo electrónico</label>
                     <InputText 
                        name="nombre"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingrese su correo"
                        error={formErrors.email}
                        disabled={user}
                     />
                  </LoginInputWrapper>
                  <LoginInputWrapper>
                     <label htmlFor="password">Contraseña</label>
                     <Password 
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        feedback={false}
                        toggleMask 
                        placeholder="Ingrese su contraseña"
                        error={formErrors.password}
                     />

                  </LoginInputWrapper>
                  {error && <MensajeError><p>{error}</p></MensajeError>}
                  <Button type="submit">Iniciar sesión</Button>
                  <LoginButtonRegistrar>
                     <p>¿No tenes una cuenta?</p><NavLink to='/registrar'>Registrate</NavLink>
                  </LoginButtonRegistrar>
               </LoginForm>
            </LoginFormWrapper>
            
         </LoginWrapper>
      </LoginContainer>
   );
};

export default Login;
