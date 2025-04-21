import styled from "styled-components"
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles"

export const ProductContainerStyled = styled(ContainerStyled)`

`

export const ProductWrapper = styled(WrapperStyled)``

export const ProductImageWrapper = styled.div`

    img {
        width: 400px;
    }
`

export const ProductInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    gap: 20px;

    h2 {
        color: var(--black-500);
        font-size: 30px;
    }
`

export const ProductoAgregarCarritoWrapper = styled.div`
    display: flex;
    gap: 20px;

    button {
        width: fit-content;
    }
`

export const ProductoAgregarCantidad = styled.div`
    display: flex;
    border-radius: 20px;
    align-items: center;
    width: fit-content;
    gap: 20px;
    padding: 10px 20px;
    border: 1px solid var(--black-300);
    user-select: none;

    span {
        font-weight: 400;
        font-size: 22px;
    }

    p {
        font-size: 18px;
        min-width: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`