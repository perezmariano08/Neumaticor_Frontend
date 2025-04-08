import { motion } from "framer-motion";
import styled from "styled-components";

export const CategoriesContainerStyled = styled.div`
    width: 100%;
    padding: 0 100px;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        padding: 0 15px;
    }
`

export const CategoriesWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
`

export const CategoryWrapper = styled(motion.div)`
    background-color: ${({ selected }) =>
    selected ? 'var(--blue)' : 'var(--red)'};
    display: flex;
    padding: 0 5px;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    color: var(--white);
    cursor: pointer;
    transition: all .3s ease-in-out;
    position: relative;
    user-select: none;
    

    img {
        height: 100px;
        position: absolute;
        left: -40px;
    }

    p {
        padding: 10px;
    }

    :selected {
        background-color: var(--blue);
        color: var(--white);
    }

    @media (min-width: 968px) {
        &:hover{
            background-color: var(--blue);
        }
    }

    @media (max-width: 768px) {
        p {
            font-size: 14px;
        }
    }
`