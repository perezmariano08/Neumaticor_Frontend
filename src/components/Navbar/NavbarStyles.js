import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const NavbarTopContainerStyled = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--black);
    height: 40px;
    width: 100%;
    @media (max-width: 968px) {
        display: none;
    }
`

export const NavbarTopWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 1260px;
    padding: 0 30px;
    gap: 5px;
`

export const NavbarTopItems = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    
    span {
        font-weight: 200;
        color: var(--white);
        padding-bottom: 3px;
    }

    .number {
        padding-bottom: 1px;
    }
`

export const NavbarTopItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 5px;

    .icon {
        color: var(--yellow);
    }
`

export const NavbarTopSocial = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .icon {
        color: var(--white);
    }
`

export const NavbarContainerStyled = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    position: sticky;
    top: 0;
    z-index: 99;
    width: 100%;
    background-color: var(--yellow);

    @media (max-width: 968px) {
        height: 60px;
    }
`

export const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 1260px;
    padding: 0 30px;
    
    .menu-icon {
        display: none;
        cursor: pointer;
        @media (max-width: 968px) {
            display: flex;
            font-size: 25px;
        }
    }
`
export const NavbarLogo = styled(motion.a)`
    height: 40%;
    display: flex;
    img {
        height: 100%;
    }
    @media (max-width: 968px) {
        min-width: auto;
    }
`

export const NavbarList = styled.ul`
    display: flex;
    justify-content: center; 
    gap: 20px;
    margin-right: 20px;
    @media (max-width: 968px) {
        display: none;
    }
`

export const NavLinkStyled = styled(NavLink)`
    color: var(--black);
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 300;
    &.active {
        font-weight: 400;
    }
`

export const NavbarIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 20px;
    color: var(--white);
    font-size: 18px;
    font-weight: 200;
    position: relative;
    min-width: 200px;

    svg {
        color: var(--black);
    }
`

export const OpenModalMenu = styled(motion.div)`
    color: var(--black);
    display: flex;
    align-items: center;
    border-radius: 5px;
    height: 100%;
`

export const OpenModalUser = styled(motion.div)`
    color: var(--black);
    display: flex;
    align-items: center;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
`

export const IconCart = styled(motion(NavLink))`
    background: var(--black);
    border-radius: 20px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--white);
    text-align: center;
    font-weight: 200;
    cursor: pointer;
    span {
        font-size: 12px;
        min-width: 16px;
    }

    i, svg {
        font-size: 16px;
        color: var(--white);
    }
`

export const IconAccount = styled(motion(NavLink))`
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--100);
    text-align: center;
    font-weight: 200;
    cursor: pointer;
`