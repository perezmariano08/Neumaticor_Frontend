import { motion } from "framer-motion";
import styled from "styled-components";
import { NavbarList } from "../Navbar/NavbarStyles";

export const ModalMenuContainerStyled = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    padding: 30px;
    flex-direction: column;
    gap: 30px;
    z-index: 99;
    display: flex;
    color: var(--white);
    background-color: var(--black);
    width: 80%;

    img {
        width: 90px;
    }
`

export const ModalMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
`


export const NavbarListModalMenu = styled(NavbarList)`
    flex-direction: column;
    display: flex;
    a {
        color: var(--white) !important;
    }
`