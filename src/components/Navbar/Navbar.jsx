import React, { useState } from 'react'
import { IconCart, NavLinkStyled, NavbarBusqueda, NavbarContainerStyled, NavbarIcons, NavbarList, NavbarLogo, NavbarTopContainerStyled, NavbarTopItem, NavbarTopItems, NavbarTopWrapper, NavbarWrapper, OpenModalMenu, OpenModalUser
} from './NavbarStyles'

// React Icons
import { FaInstagram, FaUser} from "react-icons/fa6";
import { BsEnvelopeAt } from "react-icons/bs";
import { PiShoppingCartLight } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { RiUserLine } from "react-icons/ri";
// Modales
import ModalMenu from '../ModalMenu/ModalMenu';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { toggleHiddenMenu } from '../../redux/menu/menuSlice';
import ModalUser from '../ModalUser/ModalUser';
import { IMAGES_URL } from '../../utils/constants';
import InputText from '../UI/InputText/InputText';



const Navbar = () => {
    const dispatch = useDispatch()
    const [toggleModalUser, setToggleModalUser] = useState(false)

    const totalCartItems = useSelector((state) => 
        state.cart.cartItems).reduce((acc, item) => (acc += item.quantity), 0
    )
    const [busqueda, setBusqueda] = useState('');

    const user = useSelector((state) => state.user.user);
    

    return (
        <>
            <NavbarTopContainerStyled>
                <NavbarTopWrapper>
                    <NavbarTopItems>
                        <NavbarTopItem target='_blank' to={'mailto:contacto@cubatoficial.online'}>
                            <BsEnvelopeAt />
                            <p>contacto@neumaticor.com</p>
                        </NavbarTopItem>
                        <NavbarTopItem target='_blank' to={'https://www.instagram.com/neumaticor.ok/'}>
                            <FaInstagram />
                            <p className='number'>neumaticor.ok</p>
                        </NavbarTopItem>
                    </NavbarTopItems>
                    {
                        user && <p>{`¡Bienvenido ${user.nombre}!`}</p>
                    }
                </NavbarTopWrapper>
            </NavbarTopContainerStyled>
            <NavbarContainerStyled>
                <NavbarWrapper>
                    <NavbarLogo whileTap={{scale: .95}} href='/'>
                        <img src={`${IMAGES_URL}/images/logos/logotipo-negro.png`} alt="Logo Neumaticor" title='Neumaticor' />
                    </NavbarLogo>
                    {/* <NavbarBusqueda>
                        <InputText 
                            name="busqueda"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="¿Qué estas buscando?"
                        />
                    </NavbarBusqueda>
                     */}
                    <NavbarIcons>
                        <NavbarList>
                            <li><NavLinkStyled to={'/'}>Inicio</NavLinkStyled></li>
                            <li><NavLinkStyled to={'/productos'}>Productos</NavLinkStyled></li>
                            {!user && (
                                <li><NavLinkStyled to="/login">Acceder</NavLinkStyled></li>
                            )}
                        </NavbarList>
                        <IconCart whileTap={{scale: .85}} to={`/carrito`}>
                            <PiShoppingCartLight />
                            <span>{totalCartItems}</span>
                        </IconCart>
                        <OpenModalMenu whileTap={{scale: .8}} className='menu-icon' onClick={() => dispatch(toggleHiddenMenu())}>
                            <CgMenuGridO />
                        </OpenModalMenu>
                        {/* Mostrar el nombre del usuario si está autenticado, o el login */}
                        {user && (
                            <OpenModalUser onClick={() => setToggleModalUser(!toggleModalUser)}>
                                <RiUserLine />
                                {
                                    toggleModalUser && <ModalUser/>
                                }
                            </OpenModalUser>
                        )}
                    </NavbarIcons> 
                </NavbarWrapper>
            </NavbarContainerStyled>
            <ModalMenu/>
        </>
        
    )
}

export default Navbar