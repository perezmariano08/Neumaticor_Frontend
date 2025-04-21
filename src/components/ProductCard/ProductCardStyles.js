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

    .marca {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 18%;
    }
`

export const ProductCardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    padding: 5px;

    .price {
        font-size: 18px;
        font-weight: 400;
        color: var(--black-900);
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
`