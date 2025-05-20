import styled from "styled-components";
import { ContainerStyled, WrapperStyled } from "../mockups/MockupsStyles";
import { Carousel } from "primereact/carousel";

export const MarcasContainer = styled(ContainerStyled)`
    background-color: var(--black-900);
    justify-content: center;
`

export const MarcasWrapper = styled(WrapperStyled)`

`

export const MarcasCarousel = styled(Carousel)`
    width: 100%;
    display: flex;
    height: 100%;

    .p-carousel-items-container{
        align-items: center;

        .p-carousel-item  {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .p-carousel-indicators {
        display: none;
    }

    .p-link {
        &:hover {
            background-color: var(--black-400);
        }
        .p-icon {
            color: var(--white-0);
        }
    }

    img {
        height: 120px;
        @media (max-width: 768px) {
            height: 100px;
        }
    }
`

