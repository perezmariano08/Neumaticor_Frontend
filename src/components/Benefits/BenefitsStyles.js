import styled from "styled-components";

export const BenefitsContainerStyled = styled.section`
    background-color: var(--gray-100);
    display: flex;
    justify-content: center;
`

export const BenefitsWrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 100px;
    align-items: center;
    color: var(--gray-600);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 50px;
        padding: 50px 30px;
    }
`

export const BenefitItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    width: 33%;
    .benefit-icon {
        font-size: 30px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const BenefitText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    .benefit-title {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 18px;
    }

    .benefit-description {
        font-size: 13px;
        font-weight: 300;
    }
`