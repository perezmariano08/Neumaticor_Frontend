import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles";

export const CuentaContainer = styled(ContainerStyled)``

export const CuentaWrapper = styled(WrapperStyled)`
    gap: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`

export const CuentaMenuStyled = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    background-color: var(--white-0);
    height: fit-content;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid var(--white-100);
`

export const CuentaMenuItem = styled.li`
    display: flex;
    width: 100%;
    cursor: pointer;

    &:hover {
        a {
            text-decoration: underline;
        }
    }

    a {
        color: var(--black-800);
        font-weight: 300;
        padding: 12px 16px;
        width: 100%;
        overflow: hidden;
        border-left: 2px solid transparent;

        &.active {
            font-weight: 400;
            background-color: var(--yellow-10);
            border-left: 2px solid var(--yellow);
        }
    }
`

// Pedidos

export const CuentaPedidosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

export const CuentaPedidoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid var(--white-100);
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--white-0);
`

export const CuentaPedidoHeader = styled.div`
    display: flex;
    background-color: var(--white-100);
    align-items: center;
    padding: 16px;
    justify-content: space-between;
`

export const CuentaPedidoHeaderItems = styled.div`
    display: flex;
    gap: 40px;
`

export const CuentaPedidoHeaderItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    p {

    }

    span {
        font-weight: 300;
    }
`

export const CuentaPedidoHeaderEstado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--white-400);
    background-color: var(--white-200);
    border-radius: 10px;
    height: fit-content;
    padding: 6px 12px;

    p {
        font-size: 14px;
    }
`

export const CuentaPedidoMain = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 10px;
`

export const CuentaPedidoProductoCard = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
    }
`

export const CuentaPedidoProductoCardTexto = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 5px;
    h2 {
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        border-radius: 5px;
    }
`

// Perfil

export const CuentaPerfilWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 16px;
    height: fit-content;
    border-radius: 10px;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
`
