import styled from "styled-components";

export const HeroContainerStyled = styled.section`
    position: relative;
    background-image: url(/hero_img2.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8); 
    }
`

export const HeroWrapper = styled.div`
    padding: 0 30px;
`

export const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 100px 0;
    width: 80%;
    z-index: 1;
    color: var(--white);
    
    h1 span {
        color: var(--yellow);
    }

    p span {
        font-weight: 500;
    }

    @media (max-width: 968px) {
        width: 100%;
    }
`

export const HeroInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`