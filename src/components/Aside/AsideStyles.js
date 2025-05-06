import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const AsideContainerStyled = styled(motion.aside)`
    height: 100vh;
    width: 16rem;
    background-color: var(--black-900);
    font-size: 14px;
    z-index: 3;
    position: fixed;

    @media (max-width: 968px) {
        width: 100%;
    }

    &.page-temporadas .submenu {
        height: auto;
        background-color: transparent;
    }
`;

export const AsideHeader = styled.div`
    display: flex;
    padding: 0 30px;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--black-700);
    img {
        height: 50%    
    }
`

export const AsideUser = styled.div`
    display: flex;
    padding: 0 30px;
    height: 50px;
    width: 100%;
    align-items: center;
    gap: 10px;
    img {
        width: 20px;
        border-radius: 50%;
    }

    &i,svg{
        color: red;
        font-size: 20px;
        cursor: pointer;
    }
`

export const AsideMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

`

export const AsideMenu = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    padding: 20px;

    &.bottom {
        overflow: hidden;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: var(--black-800);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--black-100);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    a.p-accordion-header-link {
        background-color: transparent;
        color: var(--white-0);
        border: none;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 10px;

        &:hover {
            background-color: var(--yellow);
            color: var(--black-800);
            .p-accordion-header-text {
                color: var(--black-800);
            }
            svg {
                color: var(--black-800);
            }
        }

        .p-accordion-header-text {
            color: var(--white-0);
        }
    }

    .p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link {
        border-radius: 10px;
    }

    .tab {
        display: flex;
        align-items: center;
        gap: 10px;
        p {
            font-weight: 300;
        }
        svg {
            font-size: 14px;
            color: var(--yellow);
        }
    }

    .p-accordion-content {
        border: none;
    }
`

export const MenuItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
`

export const AccordionMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    background-color: var(--black-800);
`

export const AccordionMenu = styled(NavLink)`
    display: flex;
    color: var(--white-0);
    overflow: hidden;
    border: none;
    background-color: var(--black-800);
    font-weight: 300;
    padding: 10px;
    border-left: 1px solid var(--yellow);


    &.active {
        color: var(--yellow);
    }

    &:hover {
        background-color: var(--black-600);
    }
`

export const NavLinkItem = styled(motion(NavLink))`
    display: flex;
    gap: 10px;
    padding: 10px;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2;
    color: var(--white-0);
    p {
        font-weight: 300;
    }
    
    svg {
        color: var(--yellow);
    }


    &.active {
        background-color: var(--yellow);
        color: var(--black-900);
        p {
            font-weight: 400;
        }
        i, svg {
            color: var(--black-900);
        }
    }

    &.custom-navlink {
        background-color: transparent;
        color: var(--black-0);
    }

    &:hover {
        background-color: var(--yellow);
        transition: all .2s;
        
        i, svg {
            color: var(--black-900);
        }
        color: var(--black-900);
    }

    &.logout {
        background-color: var(--red);
        color: var(--white-0);
        svg {
            color: var(--white-0);
        }
    }
`

export const NavLinkAngleDown = styled(motion.div)`
    height: auto;
    display: flex;
    align-items: center;
    i, svg {

    }
`

export const SubMenu = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--green);
    margin-left: 17px;
    padding-left: 7px;
    z-index: 1;
    transition: max-height .45s cubic-bezier(.86,0,.07,1);
`

export const SubMenuItem = styled(NavLink)`
    display: flex;
    gap: 10px;
    padding: 10px;
    width: 100%;
    align-items: center;
    cursor: pointer;
    color: var(--white);
    &.active {
        color: var(--green);
    }
`