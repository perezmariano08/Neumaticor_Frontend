import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 99;
`

export const NavbarTopContainerStyled = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--black-900);
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
    max-width: 1230px;
    padding: 0 15px;
    gap: 5px;

    p {
        color: var(--white-50);
    }
`

export const NavbarTopIcons = styled.div`
    display: flex;
    gap: 20px;
    
    a {
        color: var(--white-0);
        display: flex;
        align-items: center;
        gap: 10px;
        position: relative;

        span {
            position: absolute;
            display: flex;
            transition: all ease-in-out .2s;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            top: -6px;
            right: -12px;
            background-color: var(--yellow);
            color: var(--black-900);
            font-weight: 400;
            font-size: 10px;
        }

        svg {
            font-size: 19px;
        }

        &:hover {
            svg {
                color: var(--yellow);
                transition: all ease-in-out .2s;
            }
        }
    }
`

export const NavbarTopItems = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`

export const NavbarTopItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 6px;

    p {
        padding-bottom: 3px;
        &.number {
            padding-bottom: 1px;
        }
    }

    svg {
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
        height: 48px;
    }
`

export const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 1230px;
    padding: 0 15px;
    gap: 40px;
    
    input {
        width: 100%;
    }

    .menu-icon {
        display: none;
        cursor: pointer;
        @media (max-width: 968px) {
            display: flex;
            font-size: 25px;
        }
    }

    @media (max-width: 968px) {
        justify-content: center;
    }
`

export const NavbarBusqueda = styled.form`
    display: flex;
    width: 100%;
    gap: 5px;
    input {
        width: 100%;
    }

    button {
        justify-content: center;
        align-items: center;
        svg {
            font-size: 20px;
        }
    }

    @media (max-width: 968px) {
        display: none;
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
        height: 50%;

    }
`

export const NavbarList = styled.ul`
    display: flex;
    justify-content: center; 
    gap: 20px;
    @media (max-width: 968px) {
        display: none;
    }
`

export const NavLinkStyled = styled(NavLink)`
    color: var(--text);
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
    color: var(--black-50);
    font-size: 18px;
    font-weight: 200;
    position: relative;

    svg {
        color: var(--black-900);
    }
    @media (max-width: 968px) {
        display: none;
    }
`

export const OpenModalMenu = styled(motion.div)`
    color: var(--black-900);
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

export const NavbarMobile = styled.div`
    display: none;
    position: relative;
    @media (max-width: 968px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;
        width: 100%;
        background-color: var(--black-900);
        padding: 0 16px;
        color: var(--white-0);

        a {
            color: var(--white-0);
            display: flex;
            align-items: center;
            position: relative;
            span {
                position: absolute;
                display: flex;
                transition: all ease-in-out .2s;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                top: -6px;
                right: -8px;
                background-color: var(--yellow);
                color: var(--black-900);
                font-weight: 400;
                font-size: 10px;
            }
        }

        svg {
            font-size: 24px;
            cursor: pointer;
        } 
    }
`

export const NavbarMobileForm = styled.form`
    display: none;
    @media (max-width: 968px) { 
        position: absolute;
        background-color: var(--white-0);
        width: 100%;
        height: fit-content;
        z-index: 99;
        top: 100px;
        left: 0;
        display: flex; 

        input {
            border-radius: 0;
            height: 100%;
        }

        button {
            border-radius: 0;
            background-color: var(--white-100);
            border: 1px solid var(--white-100);
            svg {
                font-size: 18px;
            }
        }
    }
`