import styled from "styled-components";

export const FooterContainerStyled = styled.footer`
    background-color: var(--black);
`

export const FooterWrapper = styled.div`
    padding: 50px 30px;
    flex-direction: column;
    gap: 40px;
    color: var(--gray-400);
    font-weight: 200;

    @media (max-width: 968px) {
        
    }
`

export const FooterInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 968px) {
        flex-direction: column;
    }
`

export const FooterBrand = styled.div`
    display: flex;
    flex-direction:column;
    gap: 30px;
    max-width: 500px;
    width: 100%;
    img {
        width: 120px;
    }
`

export const FooterSocialIcons = styled.div`
    display: flex;
    gap: 10px;
    i, svg {
        color: var(--yellow);
    }
    
`

export const FooterMenu = styled.ul`
    display: flex;
    flex-direction: column;
    color: var(--white);
    gap: 20px;
    text-transform: uppercase;
`

export const FooterContact = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const ItemFooterContact = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--white);
    span {
        color: var(--yellow);
    }
`

export const FooterDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--gray-400);
`

export const FooterCopyright = styled.div`
    
`