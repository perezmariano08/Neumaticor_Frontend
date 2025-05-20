import React, { useState } from 'react'
import { NavLinkStyled, NavbarBusqueda, NavbarContainer, NavbarContainerStyled, NavbarIcons, NavbarList, NavbarLogo, NavbarMobile, NavbarMobileForm, NavbarTopContainerStyled, NavbarTopIcons, NavbarTopItem, NavbarTopItems, NavbarTopWrapper, NavbarWrapper, OpenModalMenu, OpenModalUser
} from './NavbarStyles'

// React Icons
import { FaInstagram } from "react-icons/fa6";
import { BsEnvelopeAt } from "react-icons/bs";
import { CgMenuGridO, CgSearch  } from "react-icons/cg";
import { RiInstagramLine, RiMailLine, RiMenu2Line, RiSearchLine, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
// Modales
import ModalMenu from '../ModalMenu/ModalMenu';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleHiddenMenu } from '../../redux/menu/menuSlice';
import { IMAGES_URL } from '../../utils/constants';
import { NavLink, useNavigate } from 'react-router-dom';
import InputText from '../../components/UI/InputText/InputText'
import Button from '../../components/UI/Button/Button'
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalCartItems = useSelector((state) => 
        state.cart.cartItems).reduce((acc, item) => (acc += item.quantity), 0
    )

    const user = useSelector((state) => state.user.user);
    const [busqueda, setBusqueda] = useState('') 
    const [mostrarBusquedaMobile, setMostrarBusquedaMobile] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!busqueda) return;
        navigate(`/buscar/${encodeURIComponent(busqueda)}`);
        setBusqueda(''); // cerrar luego de buscar
        setMostrarBusquedaMobile(false); // cerrar luego de buscar
    }

    return (
        <NavbarContainer>
            <NavbarTopContainerStyled>
                <NavbarTopWrapper>
                    <NavbarTopItems>
                        <NavbarTopItem target='_blank' to={'mailto:contacto@neumaticor.com.ar'}>
                            <RiMailLine />
                            <p>contacto@neumaticor.com.ar</p>
                        </NavbarTopItem>
                        <NavbarTopItem target='_blank' to={'https://www.instagram.com/neumaticor.ok/'}>
                            <RiInstagramLine />
                            <p className='number'>neumaticor.ok</p>
                        </NavbarTopItem>
                    </NavbarTopItems>
                    <NavbarTopIcons>
                        <NavLink to={'/cuenta'}>
                            {user && <p>{`¡Bienvenido ${user.nombre}!`}</p>}
                            <RiUserLine />
                        </NavLink>
                        <NavLink to={'/carrito'}>
                            <RiShoppingCartLine />
                            {
                                totalCartItems > 0 && <span>{totalCartItems}</span>
                            }
                        </NavLink>
                    </NavbarTopIcons>
                </NavbarTopWrapper>
            </NavbarTopContainerStyled>
            <NavbarContainerStyled>
                <NavbarWrapper>
                    <NavbarLogo whileTap={{scale: .95}} href='/'>
                        <img src={`${IMAGES_URL}/images/logos/logotipo-negro.png`} alt="Logo Neumaticor" title='Neumaticor' />
                    </NavbarLogo>
                    <NavbarBusqueda onSubmit={handleSubmit}>
                        <InputText 
                            name="busqueda"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar producto..."
                        />
                        <Button type="submit" background='white-0'><CgSearch /></Button>
                    </NavbarBusqueda>
                    <NavbarIcons>
                        <NavbarList>
                            <li><NavLinkStyled to={'/'}>Inicio</NavLinkStyled></li>
                            <li><NavLinkStyled to={'/productos?order=OrderByOffer'}>Productos</NavLinkStyled></li>
                            {!user && (
                                <li><NavLinkStyled to="/login">Acceder</NavLinkStyled></li>
                            )}
                            {user.isAdmin && (
                                <li><NavLinkStyled to="/admin/usuarios">Admin</NavLinkStyled></li>
                            )}
                        </NavbarList>
                        {/* Mostrar el nombre del usuario si está autenticado, o el login */}
                    </NavbarIcons> 
                </NavbarWrapper>
            </NavbarContainerStyled>
            <NavbarMobile>
                <RiMenu2Line onClick={() => dispatch(toggleHiddenMenu())} />
                <RiSearchLine onClick={() => setMostrarBusquedaMobile(prev => !prev)} />
                <NavLink to={'/cuenta'}><RiUserLine /></NavLink>
                <NavLink to={'/carrito'}>
                    <RiShoppingCartLine />
                    {
                        totalCartItems > 0 && <span>{totalCartItems}</span>
                    }
                </NavLink>
            </NavbarMobile>
            <AnimatePresence>
                {mostrarBusquedaMobile && (
                    <NavbarMobileForm
                        as={motion.form}
                        onSubmit={handleSubmit}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <InputText 
                            name="busquedaMobile"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar producto..."
                        />
                        <Button type="submit" background='white-0'><CgSearch /></Button>
                    </NavbarMobileForm>
                )}
            </AnimatePresence>
            <ModalMenu/>
        </NavbarContainer>
        
    )
}

export default Navbar