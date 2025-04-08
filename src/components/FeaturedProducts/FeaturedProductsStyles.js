import styled from "styled-components";

export const FeaturedProductsContainer = styled.section`
`

export const FeaturedProductsWrapper = styled.div`
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;

    h2 {
        text-align: center;
    }
`

export const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 40px;
    justify-content: center;
    align-items: center;
    @media (max-width: 968px) {
        column-gap: 10px;
        row-gap: 20px;
    }
`