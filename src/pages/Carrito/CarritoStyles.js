import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const CarritoContainer = styled(ContainerStyled)``

export const CarritoWrapper = styled(WrapperStyled)`
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    flex-direction: column;
`

export const CarritoTitulo = styled.h2`
    font-size: 20px;
    font-weight: 300;
    color: var(--black-900);
    text-transform: none;
`

export const CarritoMain = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

export const CarritoItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

export const CarritoItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

export const CarritoPedidoDetallesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 400px;
    height: fit-content;
    position: sticky;
    top: 120px;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 10px;
    }
`

export const CarritoCupon = styled.div`
    display: flex;
    gap: 10px;
`

export const CarritoAccordionContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
        font-weight: 300;
    }
`

export const CarritoAccordionContentButton = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;

    input {
        width: 100%;
    };
`

export const CarritoResumenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--white-0);
    border-radius: 10px;
    border: 1px solid var(--white-100);
    min-width: 400px;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 10px;
    }
`

export const CarritoResumenTitulo = styled.div`
    padding: 16px;
    font-weight: 300;
    border-bottom: 1px solid var(--white-100);
`

export const CarritoResumenSubtotal = styled.div`
    padding: 12px 16px;
    font-weight: 200;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CarritoResumenTotal = styled.div`
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 18px;
        font-weight: 300;
    }
`

export const CarritoResumenButtons = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    button {
        width: 100%;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: underline;
        font-weight: 300;
        font-size: 14px;
        color: var(--black-900);
    }
`