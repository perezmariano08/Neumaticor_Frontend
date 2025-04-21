import styled from "styled-components"
import { ContainerStyled, WrapperStyled } from "../../components/mockups/MockupsStyles"

export const ProfileContainer = styled(ContainerStyled)``

export const ProfileWrapper = styled(WrapperStyled)`
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    flex-direction: column;
`

export const ProfileMain = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

export const ProfilePasosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`

export const ProfilePasoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

export const ProfilePasoTitulo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
        font-weight: 300;
        font-size: 20px;
        line-height: 20px;
        text-transform: none;
    }

    p {

    }
`

export const ProfilePasoForm = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px; // Espacio entre columnas y filas
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    padding: 16px;
    border-radius: 10px;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`

export const ProfilePasoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {

    }
`

export const ProfilePasoPagosWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const ProfilePasoMetodoPagoWrapper = styled.div`
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    padding: 16px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: fit-content;
`

export const ProfilePasoDetalleMetodo = styled.div`
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    padding: 16px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: fit-content;
    width: 100%;
`

export const ProfilePasoMetodoPago = styled.div`
    border: 1px solid var(--white-100);
    padding: 12px 16px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &.active, &:hover {
        background-color: var(--yellow-10);
        border-color: var(--yellow);
    }

    svg {

    }
`

export const ProfilePasoTarjetaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
        font-weight: 300;
    }
`


export const ProfilePasoRetiroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    padding: 16px;
    border-radius: 10px;
    gap: 20px;
`

export const ProfilePasoSucursalWrapper = styled.div`
    display: flex;
    gap: 20px;
    img {
        width: 100px;
    }
`

export const ProfilePasoSucursal = styled.div`
    display: flex;
    align-items: center;

`
