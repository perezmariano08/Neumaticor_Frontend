import styled from "styled-components";

export const ProductCardWrapper = styled.article`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
    border-radius: 20px;

    @media (max-width: 768px) {
        width: 44%;
    }
`
export const ProductImg = styled.div`
    width: 100%;
    background-color: var(--white);
    border-radius: 20px;
    border: 1px solid var(--gray-200);
    display: flex;
    overflow: hidden;
    position: relative;

    .producto {
        width: 100%;
        transition: all .3s ease-in-out;
        cursor: pointer;
        &:hover {
            opacity: .80;
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
    padding: 0 5px;
    h3 { 
        font-size: 16px;
        line-height: 16px;
        color: var(--blue);   
        min-height: 32px;
    }
    
    h4 {
        font-size: 20px;
        font-weight: 500;
        color: var(--gray-500);
    }

    @media (max-width: 968px) {
        h3 {
            font-size: 14px;
            line-height: 14px;
            min-height: 24px;
            min-height: 42px;
        }

        h4 {
            font-size: 18px;
            font-weight: 500;
            color: var(--gray-500);
        }   
    }
`

export const ProductTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {
        color: var(--gray-400);
        text-transform: uppercase;
        font-size: 12px;
    }

    @media (max-width: 968px) {
        span {
            font-size: 10px;
            line-height: 10px;
        }

        h4 {
            font-size: 10px;
            font-weight: 500;
            color: var(--gray-500);
        }   
    }
`

export const ProductButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`