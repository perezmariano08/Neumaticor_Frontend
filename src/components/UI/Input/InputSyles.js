import styled from "styled-components";

export const InputContainerStyled = styled.div`
    border: none;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    border-radius: 30px;
    width: 100%;
    position: relative;
    height: 100%;

    .p-calendar {
        height: 100%;
        width: 100%;
        
        input {
            background-color: var(--gray-400);
            border-radius: 10px;
            border: 1px solid var(--gray-400); 
            color: var(--white);
            outline: none; 
            width: 100%;
            padding: 10px 36px;
            transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
            appearance: none;
            border-radius: 6px;
            outline-color: transparent;

            &:focus {
                outline: 0 none;
                outline-offset: 0;
                box-shadow: 0 0 0 1px var(--green);
                border-color: var(--green);
                
                
            }
        }
    }

    .hi-eye {
        cursor: pointer;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }


    &:focus-within .icon-input {
        /* Estilos del icono cuando el contenedor principal tiene el foco */
        color: var(--yellow);
    }

    span {
        font-size: 14px;
        font-weight: 300;
        padding-bottom: 5px;
        color: var(--danger);
    }
`
export const LoaderIconWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
`;

export const InputWrapper = styled.input`
    background-color: transparent;
    border: 1px solid var(--gray-200); 
    color: var(--black);
    outline: none; 
    width: 100%;
    padding: 10px;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    border-radius: 10px;
    outline-color: transparent;
    font-size: 14px;
    display: flex;
    align-items: center;

    &:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 1px var(--yellow);
        border-color: var(--yellow);

        ~ .icon-input {
            color: var(--yellow);
        }
    }

    &.error {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0  0 var(--red);
        border-color: var(--red);

        ~ .icon-input {
            color: var(--red);
        }
    }

    &::placeholder {
        color: var(--gray-300); /* Cambia 'red' por el color que prefieras */
        font-weight: 300;
    }
`;

export const InputCheckWrapper = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
    gap: 5px;
    margin: 4px 0;
    cursor: pointer;
    width: fit-content;
    user-select: none;
    font-weight: 300;
    // Añadir estilo para el label y el texto

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: var(--yellow);
    }
    .p-checkbox.p-highlight .p-checkbox-box {
        border-color: var(--yellow);
        background: var(--yellow);

        svg {
            color: var(--black);
        }
    }

`;

export const InputContainerStyled2 = styled.div`
    background-color: var(--gray-300);
    border: none;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--gray-200);
    font-size: 16px;
    width: 100%;
`

export const InputWrapper2 = styled.input`
    background-color: transparent;
    border-radius: 5px;
    color: var(--white);
    border: 1px solid var(--gray-200);
    outline: none; 
    width: 100%;
    padding: 8px;
    width: 60%;
    
    ${({ disabled }) => disabled && `
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    `}

    &.error {
        border-color: var(--red);
        box-shadow: 0 0 0 1px var(--red);
    }

    &.success {
        border-color: var(--green);
        box-shadow: 0 0 0 1px var(--green);
    }
`;

export const InputAreaWrapper = styled.textarea`
    background-color: var(--gray-400);
    border-radius: 10px;
    border: 1px solid var(--gray-300); 
    color: var(--white);
    outline: none; 
    width: 100%;
    padding: 10px;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    border-radius: 6px;
    outline-color: transparent;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 150px;

    &:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 1px var(--green);
        border-color: var(--green);

        ~ .icon-input {
            color: var(--green);
        }
    }

    &.error {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0  0 var(--red);
        border-color: var(--red);

        ~ .icon-input {
            color: var(--red);
        }
    }
`;