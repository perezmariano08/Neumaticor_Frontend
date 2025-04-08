import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { ModalMenuContainerStyled, ModalMenuHeader, NavbarListModalMenu } from './ModalMenuStyles'
import { useDispatch, useSelector } from 'react-redux'
import { ModalOverlayStyled } from '../ModalCart/ModalCartStyles'
import { toggleHiddenMenu } from '../../redux/menu/menuSlice'
import { NavLinkStyled } from '../Navbar/NavbarStyles'
import LogoNavbar from '/Logos/Logotipo-Positivo.png'
import Divider from '../Divider/Divider'
import { MdOutlineClose } from "react-icons/md";

const ModalMenu = () => {
    const dispatch = useDispatch()
    const hiddenMenu = useSelector((state) => state.menu.hidden)
    return (
        <>
            {
            !hiddenMenu && (
                <ModalOverlayStyled
                    onClick={() => dispatch(toggleHiddenMenu())}
                />
            )}
                <AnimatePresence>
                    {
                        !hiddenMenu && (
                            <ModalMenuContainerStyled
                                initial={{ translateX: 600 }}
                                animate={{ translateX: 0 }}
                                exit={{ translateX: 600 }}
                                transition={{ type: "spring", damping: 27 }}
                                key="modal-menu"
                            >
                                <ModalMenuHeader>
                                    <img src={LogoNavbar} alt="" />
                                    <MdOutlineClose onClick={() => dispatch(toggleHiddenMenu())} />
                                </ModalMenuHeader>
                                <Divider/>
                                <NavbarListModalMenu>
                                    <NavLinkStyled to={'/'} onClick={() => dispatch(toggleHiddenMenu())}>Inicio</NavLinkStyled>
                                    <NavLinkStyled to={'/servicios'} onClick={() => dispatch(toggleHiddenMenu())}>Servicios</NavLinkStyled>
                                    <NavLinkStyled to={'/productos'} onClick={() => dispatch(toggleHiddenMenu())}>Productos</NavLinkStyled>
                                    <NavLinkStyled to={'/contacto'} onClick={() => dispatch(toggleHiddenMenu())}>Contacto</NavLinkStyled>
                                    <NavLinkStyled to={'/sobre-nosotros'} onClick={() => dispatch(toggleHiddenMenu())}>Sobre nosotros</NavLinkStyled>
                                </NavbarListModalMenu>
                            </ModalMenuContainerStyled>
                        
                    )
                    }
                    
                </AnimatePresence>            
        </>
        
    )
}

export default ModalMenu