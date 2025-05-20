import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const ProductsContainerStyled = styled(ContainerStyled)`

`

export const ProductsWrapper = styled(WrapperStyled)`
    justify-content: space-between;
    flex-direction: column;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 40px 20px;
    }
`

export const ProductosMain = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`


export const ProductosFiltroWrapper= styled.div`
    display: flex;
    flex-direction: column;
    top: 80px;
    min-width: 250px;
    justify-content: start;
    gap: 20px;

    @media (max-width: 768px) {
    }
`

export const AccordionContent = styled.div`
    padding: 7px 0;
`

export const ListaProductosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    p {
        font-weight: 300;
        color: var(--black-600);
        font-size: 15px;
        span {
            font-weight: 400;
            color: var(--black-900);
        }
    }
`

export const Filtros = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    align-items: center;
    justify-content: end;
    width: 100%;
    svg {
        font-size: 20px;
    }

    @media (max-width: 968px) {
        flex-direction: column;
    }
`

export const FiltroOrden = styled.div`
    display: flex;
    gap: 20px;
    width: 50%;
    align-items: center;

    p {
        font-weight: 200;
        align-items: center;
        display: flex;
        gap: 5px;
        min-width: fit-content;
    }

    .p-dropdown {
        width: 100%;
    }

    @media (max-width: 968px) {
        width: 100%;
    }
`

export const ListaProductos = styled.div`
    display: grid;
    width: 100%;
    gap: 20px;
    row-gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    @media (max-width: 968px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    @media (max-width: 500px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
`;

