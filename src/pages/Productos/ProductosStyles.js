import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const ProductsContainerStyled = styled(ContainerStyled)`

`

export const ProductsWrapper = styled(WrapperStyled)`
    justify-content: space-between;
    padding: 40px 30px;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const ProductosFiltroWrapper= styled.div`
    background-color: var(--white);
    position: sticky;
    display: flex;
    flex-direction: column;
    top: 80px;
    min-width: 200px;
    justify-content: start;
    gap: 30px;

    @media (max-width: 768px) {
        position: static;
        flex-direction: row;
    }
`


export const ListaProductosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ListaProductos = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
`