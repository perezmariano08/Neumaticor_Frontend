import styled from "styled-components";

export const ProductCardCarritoWrapper = styled.article`
    display: flex;
    padding: 16px;
    border-radius: 16px;
    width: 100%;
    gap: 20px;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    border-bottom: none;
    
    &.profile {
        border: none;
        border-bottom: 1px solid var(--white-100);
        border-radius: 0;
    }

    &.off {
        border: 1px solid var(--red);
        background-color: var(--red-10);
    }
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const ProductCardCarritoMain = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;

    img {
        width: 70px;
        border-radius: 10px;
    }
`

export const ProductCardCarritoDetalles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const ProductCardCarritoDescripcion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
        font-size: 10px;
        font-weight: 200;
        color: var(--black-0);
        text-transform: uppercase;
    }

    h3 {
        font-size: 16px;
        line-height: 16px;
        font-weight: 200;
        color: var(--black-900);
    }
`

export const ProductCardCarritoPrecio = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    
    p {
        font-size: 18px;
        font-weight: 400;
    }

    p.price-off {
        font-size: 14px;
        font-weight: 200;
        color: var(--black-900);
        text-decoration: line-through;
    }
`

export const ProductCardButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 8px;

    svg {
        font-size: 16px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 100%;
        justify-content: end;
    }
`

export const ProductCardCantidad = styled.div`
    display: flex;
    gap: 10px;
    border: 1px solid var(--yellow);
    border-radius: 10px;
    padding: 8px 16px;
    user-select: none;

    span {
        cursor: pointer;
    }

    p {
        min-width: 32px;
        text-align: center;
        font-weight: 300;
    }
`