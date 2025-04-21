import styled from "styled-components";

export const SelectContainerStyled = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    gap: 5px;
    position: relative;
    min-width: 200px;
    cursor: pointer;
    .arrow {
        position: absolute;
        right: 12px;
        color: var(--black-200);
    }

    /* .icon-select {
        position: absolute;
        left: 12px;
        color: var(--gray-100);
    } */

    select:focus ~ .icon-select {
        color: var(--green);
    }

    &.planilla {
        width: 60%;
    }
`
export const SelectWrapper = styled.select`
    border-radius: 10px;
    width: 100%;
    background-color: transparent;
    color: var(--black);
    height: 100%;
    border: 1px solid var(--gray-200);
    padding: 10px;
    font-size: 14px;
    outline: none;
    appearance: none; /* Oculta el estilo por defecto del select */
    -webkit-appearance: none; /* Para navegadores WebKit */
    -moz-appearance: none; /* Para navegadores Mozilla */
    z-index: 2;
    cursor: pointer;
    &:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 1px var(--yellow);
        border-color: var(--yellow);
    }

    &:focus + .icon-select {
        color: var(--yellow); /* Cambia el color del ícono al estar en foco */
    }

    &:disabled {
        color: var(--gray-200);
        background-color: var(--gray-500);
        cursor: not-allowed;
        transition: all .2s ease-in-out;
    }

    option {
        background-color: var(--gray-500);
        color: var(--white);
        cursor: pointer;
        border: none;
        &:disabled {
            display: none;
        }
        &:hover {
            background-color: red
        }
    }
`