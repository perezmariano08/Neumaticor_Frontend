import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const LoginContainer = styled(ContainerStyled)``

export const LoginWrapper = styled.div`
   justify-content: center;
   display: flex;
   height: 100%;
   width: 100%;
`

export const MensajeError = styled.div`
   padding: 8px 20px;
   border-radius: 10px;
   background-color: #f851491a;
   border: 1px solid  #f8514966;
`

export const LoginImagenWrapper = styled.div`
   width: 50%;
   background-image: ${({ imageUrl }) => `url(${imageUrl})`};
   background-size: cover;
   background-position: center;
   display: flex;
   height: 100vh;
   overflow: hidden; // importante para que no se escape el ::after
   position: relative;

   &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); // capa negra con 50% de opacidad
      z-index: 1;
   }

   img {
      z-index: 2;
      position: absolute;
      top: 40px;
      left: 40px;
      width: 20%;
   }

   @media (max-width: 968px) {
      display: none;
   }
`

export const LoginFormWrapper = styled.div`
   width: 50%;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 60px;
   gap: 30px;

   h2 {
      text-align: start;
      font-size: 24px;
      line-height: 24px;
      text-transform: none;
      font-weight: 400;
   }

   @media (max-width: 968px) {
      width: 100%;
      padding: 30px;
   }
`

export const LoginForm = styled.form`
   display: flex;
   flex-direction: column;
   width: 100%;
   gap: 20px;

   button {
      margin-top: 10px;
      width: 100%;
   }

   @media (max-width: 768px) {
      width: 100%;
   }
`
export const LoginButtonRegistrar = styled.div`
   display: flex;
   gap: 5px;

   a {
      color: var(--black-900);
   }
`

export const LoginInputWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;

   label {
      font-size: 16px;
      font-weight: 200;
   }
`

export const Input = styled.input`
   width: 100%;
   padding: 10px;
   margin: 10px 0;
   border: 1px solid #ccc;
   border-radius: 4px;

   &::placeholder {
      opacity: .5;
      font-weight: 300;
   }
`;

