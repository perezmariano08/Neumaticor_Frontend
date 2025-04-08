import React, { useState } from 'react'
import { 
    IconCart, 
    NavLinkStyled, 
    NavbarContainerStyled, 
    NavbarIcons, 
    NavbarList, 
    NavbarLogo, 
    NavbarTopContainerStyled, 
    NavbarTopItem, 
    NavbarTopItems, 
    NavbarTopWrapper, 
    NavbarWrapper, 
    OpenModalMenu, 
    OpenModalUser
} from './NavbarStyles'

// React Icons
import { FaInstagram, FaUser} from "react-icons/fa6";
import { BsEnvelopeAt } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
// Modales
import ModalMenu from '../ModalMenu/ModalMenu';
import ModalCart from '../ModalCart/ModalCart';

import { useDispatch, useSelector } from 'react-redux';
import { toggleHiddenMenu } from '../../redux/menu/menuSlice';
import LogoNavbar from '/Logos/Logotipo-Negro.png'
import { logout } from '../../redux/user/userSlice';
import ModalUser from '../ModalUser/ModalUser';


const Navbar = () => {
    const dispatch = useDispatch()
    const [toggleModalUser, setToggleModalUser] = useState(false)
    const totalCartItems = useSelector((state) => 
        state.cart.cartItems).reduce((acc, item) => (acc += item.quantity), 0
    )

    const user = useSelector((state) => state.user.user);
    

    return (
        <>
            <NavbarTopContainerStyled>
                <NavbarTopWrapper>
                    <NavbarTopItems>
                        <NavbarTopItem target='_blank' to={'mailto:contacto@cubatoficial.online'}>
                            <BsEnvelopeAt className='icon'/>
                            <span>contacto@neumaticor.com</span>
                        </NavbarTopItem>
                        <NavbarTopItem target='_blank' to={'https://wa.link/5je7pn'}>
                            <FaInstagram className='icon'/>
                            <span className='number'>neumaticor.ok</span>
                        </NavbarTopItem>
                    </NavbarTopItems>
                </NavbarTopWrapper>
            </NavbarTopContainerStyled>
            <NavbarContainerStyled>
                <NavbarWrapper>
                    <NavbarLogo whileTap={{scale: .95}} href='/'>
                        <img src={LogoNavbar} alt="Logo Cubat" className='logo-navbar'/>
                    </NavbarLogo>
                    <NavbarIcons>
                        <NavbarList>
                            <li><NavLinkStyled to={'/'}>Inicio</NavLinkStyled></li>
                            <li><NavLinkStyled to={'/productos'}>Productos</NavLinkStyled></li>
                            {!user && (
                                <li><NavLinkStyled to="/login">Acceder</NavLinkStyled></li>
                            )}
                        </NavbarList>
                        <IconCart whileTap={{scale: .85}} to={`/checkout`}>
                            <IoCartOutline/>
                            <span>{totalCartItems}</span>
                        </IconCart>
                        <OpenModalMenu whileTap={{scale: .8}} className='menu-icon' onClick={() => dispatch(toggleHiddenMenu())}>
                            <CgMenuGridO />
                        </OpenModalMenu>
                        {/* Mostrar el nombre del usuario si está autenticado, o el login */}
                        {user && (
                            <OpenModalUser onClick={() => setToggleModalUser(!toggleModalUser)}>
                                <FaUser />
                                {
                                    toggleModalUser && <ModalUser/>
                                }
                            </OpenModalUser>
                        )}
                        
                    </NavbarIcons> 
                </NavbarWrapper>
            </NavbarContainerStyled>
            <ModalCart/>
            <ModalMenu/>
            
        </>
        
    )
}

export default Navbar