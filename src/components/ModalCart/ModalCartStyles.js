import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalOverlayStyled = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    cursor: pointer;
`;

export const ModalCartContainerStyled = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    width: 600px;
    height: 100vh;
    padding: 30px;
    flex-direction: column;
    gap: 20px;
    z-index: 99;
    display: flex;
    overflow-y: auto;
    background-color: var(--white);

    @media (max-width: 968px) {
        width: 100%;
    }
`

export const ModalCartTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    h3 {
        color: var(--blue);
        text-transform: uppercase;
        font-size: 20px;
        line-height: 20px;
        width: 100%;
    }

    .icon-close {
        cursor: pointer;
        color: var(--blue);
        text-align: center;
    }
`

export const ModalCartDivider = styled.div`
    background-color: var(--gray-200);
    height: 1px;
    width: 100%;
`
export const ModalCartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: hidden;
`
export const ModalCartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow-y: auto;
`

export const ModalCartItemWrapper = styled.div`
    gap: 20px;
    display: flex;
    max-height: 150px;
    align-items: center;
    background-color: var(--white);
    border: 1px solid var(--gray-200);
    color: var(--blue);
    padding: 20px 10px;
    border-radius: 20px;
    user-select: none;
    img {
        height: 100%;
    }
    @media (max-width: 968px) {
        img {
            height: 80px;
        }   
    }
`

export const ItemInfo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ItemText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;

    h4 {
        font-size: 20px;
        font-weight: 500;
        color: var(--gray-500);
    }
    @media (max-width: 968px) {
        h4 {
            font-size: 14px;
            font-weight: 500;
            color: var(--gray-500);
        }   
    }
`

export const ItemTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;

    h3 {
        font-size: 16px;
        line-height: 16px;
        text-transform: uppercase;
    }

    span {
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        text-transform: uppercase;
        color: var(--gray-400);
    }
    @media (max-width: 968px) {
        h3 {
            font-size: 12px;
            line-height: 12px;
            min-height: 24px;
        }

        span {
            font-size: 8px;
            line-height: 8px;
        }   
    }
`

export const ItemHandler = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    

    .item-quantity {
        font-weight: 600;
    }

    .quantity-handler {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 8px;
        color: var(--blue);
        font-weight: 300;
        cursor: pointer;
        user-select: none;
    }

    svg {
        color: var(--red);
        cursor: pointer;
    }

    .down.disabled {
        visibility: hidden;
    }
`

export const ModalCartPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-transform: uppercase;
    h4, span {
        font-weight: 800;
        font-size: 18px;
    }
`

export const ModalCartButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`