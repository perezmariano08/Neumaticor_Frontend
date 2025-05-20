import { motion } from "framer-motion";
import styled from "styled-components";
import { NavbarList } from "../Navbar/NavbarStyles";

export const ModalMenuContainerStyled = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding: 30px;
    flex-direction: column;
    gap: 30px;
    z-index: 99;
    display: flex;
    color: var(--white-0);
    background-color: var(--black-900);
    width: 80%;

    img {
        width: 90px;
    }
`

export const ModalMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--black-300);

    svg {
        cursor: pointer;
    }
`


export const NavbarListModalMenu = styled(NavbarList)`
    flex-direction: column;
    display: flex;
    a {
        color: var(--white) !important;
    }
`