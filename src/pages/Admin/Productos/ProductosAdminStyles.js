import styled from "styled-components";

export const ProductosFiltros = styled.div`
    display: flex;
    gap: 20px;
`


export const ProductosAdminMenuLista = styled.ul`
    display: flex;
    gap: 30px;
    border-bottom: 2px solid var(--white-100);
`

export const ProductosAdminMenuItem = styled.li`
    display: flex;
    gap: 20px;
    position: relative;

    button { 
        font-weight: 300;
        font-size: 16px;
        color: var(--black-0);
        padding: 0 5px 16px 5px;
        border: none;
        cursor: pointer;
        transition: all ease-in-out .2s;

        &:hover {
            color: var(--black-900);
        }
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px; /* Justo encima del borde gris */
            width: 100%;
            height: 2px;
            background-color: transparent;
            transition: background-color 0.3s ease;
        }

        &.active {
            color: var(--black-900);
            &::after {
                background-color: var(--yellow);
            }
        }
        
        
    }

    span {
        margin-left: 5px;
    }
`

export const ProductosCrearMain = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    form {
        width: 60%;
    }
`