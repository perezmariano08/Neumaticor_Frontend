import styled from 'styled-components';
import { ContainerStyled, WrapperStyled } from '../../components/mockups/MockupsStyles';

export const CheckoutContainer = styled(ContainerStyled)`
    
`;

export const CheckoutWrapper = styled(WrapperStyled)`
    flex-direction: column;
    max-width: 768px;
    padding: 20px;
`;

export const CheckoutTitle = styled.h3`
    color: var(--black);
    text-transform: uppercase;
    font-size: 20px;
    line-height: 20px;
    width: 100%;
    padding: 25px 0;
`

export const CheckoutItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`

export const CheckoutItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow-y: auto;
`

export const CheckoutItemWrapper = styled.div`
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

export const CheckoutDivider = styled.div`
    background-color: var(--gray-200);
    height: 1px;
    width: 100%;
`

export const CheckoutPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-transform: uppercase;
    padding: 20px;
    h4, span {
        font-weight: 800;
        font-size: 18px;
    }

    div {
        width: 100%;
    }
`

export const CheckoutTarjetasWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px ;   
    align-items: baseline;
    padding: 20px;
    border: 1px solid var(--yellow);
    border-radius: 10px;
`

export const CheckoutTarjetas = styled.div`
    display: flex;
    gap: 30px ;   
    img {
        height: 25px;
    }
`

export const CheckoutFormaPagoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
`

export const CheckoutFormaPagoItem = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    p{
        min-width: 150px;
        text-align: end;
    }
    span {
        padding: 10px 0;
    }
`



export const CheckoutButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    text-transform: uppercase;
    padding: 20px 0;
    gap: 10px;
    h4, span {
        font-weight: 800;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        button {
            width: 100%;
        }
    }
`