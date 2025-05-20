import styled from "styled-components";

export const ContentContainerStyled = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 120px);
`

export const LayoutAdminContainer = styled.main`
    width: 100%;
    display: flex;
    min-height: calc(100vh - 120px);
`

export const LayoutAdminContent = styled.div`
    width: calc(100% - 16rem);
    display: flex;
    flex-direction: column;
    padding: 30px;
    gap: 20px;
    margin-left: 16rem;
`

export const LayoutAdminContentHeader = styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-size: 24px;
        line-height: 16px;
    }
`

export const LayoutAdminUserWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    img {
        width: 20px;
    }

    p {
        font-weight: 300;
    }

    svg {
        margin-left: 5px;
        color: var(--red);
        cursor: pointer;
    }
`