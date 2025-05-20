import styled from "styled-components";

export const PedidoDetalleMain = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const PedidoDetallesLista = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    li {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 200;
        span {
            font-weight: 300;
            color: var(--black-600);
        }
    }
`