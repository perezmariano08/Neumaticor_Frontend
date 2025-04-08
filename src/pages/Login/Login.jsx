import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import { LoginContainer, LoginWrapper, LoginForm, LoginInputWrapper } from './LoginStyles';
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch
import { loginSuccess } from '../../redux/user/userSlice';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useAuthLogin } from '../../hooks/api/useAuth';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();  // Inicializa el hook useNavigate
   const dispatch = useDispatch(); // Usar useDispatch
   const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
   const { mutateAsync: loginUser, isLoading, isError, error: authError } = useAuthLogin();
   
   // Si el usuario ya está autenticado, redirigir a la página de productos
   useEffect(() => {
      if (user) {
         navigate('/');  // Redirigir al dashboard o productos si ya hay un usuario
      }
   }, [user, navigate]);

   // Función para manejar el envío del formulario
   // Función para manejar el envío del formulario
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!email || !password) {
         setError('Por favor, ingrese todos los campos');
         return;
      }

      try {
         // Aquí ejecutamos la función de login
         const response = await loginUser({ email, password });

         if (response.success) {
            // Almacenar el usuario en Redux y redirigir
            navigate('/');  // Redirigir al dashboard o productos
            dispatch(loginSuccess(response.user));
         } else {
            setError(response.message);  // Mostrar el mensaje que viene del backend
         }
      } catch (error) {
         setError('Hubo un error con la conexión');
      }
   };

   return (
      <LoginContainer>
         <LoginWrapper>
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <LoginForm onSubmit={handleSubmit}>
               <LoginInputWrapper>
                  <label htmlFor="email">Correo electrónico</label>
                  <Input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Ingrese su correo"
                  />
               </LoginInputWrapper>
               <LoginInputWrapper>
                  <label htmlFor="password">Contraseña</label>
                  <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  />
               </LoginInputWrapper>
               <Button type="submit">Iniciar sesión</Button>
            </LoginForm>
         </LoginWrapper>
      </LoginContainer>
   );
};

export default Login;
