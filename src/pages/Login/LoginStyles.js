import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const LoginContainer = styled(ContainerStyled)``

export const LoginWrapper = styled(WrapperStyled)`
   flex-direction: column;
   padding: 40px 30px;
   justify-content: center;
   height: 100%;
   gap: 40px;
`



export const LoginForm = styled.form`
   display: flex;
   flex-direction: column;
   width: 50%;
   gap: 20px;

   button {
      margin-top: 10px;
      width: 100%;
   }

   @media (max-width: 768px) {
      width: 100%;
   }
`

export const LoginInputWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   label {
      font-size: 16px;
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