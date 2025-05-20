import styled from "styled-components";

export const ProductCardWrapper = styled.article`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 20px;
    width: 100%;
    max-width: 314px;
`;

export const ProductImg = styled.header`
    width: 100%;
    background-color: var(--white-0);
    border-radius: 10px;
    border: 1px solid var(--white-100);
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;

    .producto {
        border-radius: 20px;
        width: 100%;
        transition: all .3s ease-in-out;
        cursor: pointer;
        padding: 10px;
        &:hover {
            opacity: .85;
            scale: 1.02;
        }
    }

    &.out {
        opacity: .4;
        .producto {
            
        }
    }

    .marca {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 18%;
    }

    .out {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--red);
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 6px 8px;
        text-transform: uppercase;
        font-size: 20px;
        color: var(--white-0);
        background-color: var(--red);
    }


    .oferta {
        display: flex;
        justify-content: center;
        position: absolute;
        padding: 6px 8px;
        text-transform: uppercase;
        font-size: 10px;
        color: var(--white-0);
        background-color: var(--red);
        top: 15px;
        right: 15px;
    }
`

export const ProductCardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    padding: 5px;
`

export const ProductCardPrecio = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    .price {
        font-size: 18px;
        font-weight: 400;
        color: var(--black-900);
    }

    .price-off {
        font-size: 14px;
        font-weight: 200;
        color: var(--black-900);
        text-decoration: line-through;
    }

    @media (max-width: 500px) {
        flex-direction: column-reverse;
        align-items: start;
        .price-off {
            font-size: 10px;
        }

    }
`

export const ProductTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 { 
        font-size: 16px;
        line-height: 16px;
        color: var(--black-800);   
        min-height: 32px;
        font-weight: 300;
        text-align: start;
    }

    span {
        color: var(--black-600);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 300;
    }

    @media (max-width: 968px) {
        span {
            font-size: 10px;
            line-height: 10px;
        }
    }
`

export const ProductButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    button.out {
        width: 100%;
    }
`

export const ProductButtonAgregarWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`

export const ProductButtonAgregarCantidad = styled.div`
    display: flex;
    border-radius: 10px;
    gap: 8px;

    span {
        display: flex;
        align-items: center;
        border: 1px solid var(--white-100);
        padding: 0 10px;
        border-radius: 10px;
        background-color: var(--white-0);
        cursor: pointer;
        user-select: none;
        transition: all ease-in-out .2s;

        &:hover {
            background-color: var(--yellow);
        }
    }

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px;
        text-align: center;
        font-weight: 400;
    }
`