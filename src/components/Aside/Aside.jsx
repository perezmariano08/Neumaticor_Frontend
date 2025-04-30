import React, { useEffect, useState } from 'react';
import { AsideContainerStyled, AsideHeader, AsideMenu, AsideMenuWrapper, MenuItem, NavLinkAngleDown, NavLinkItem, SubMenu, SubMenuItem } from './AsideStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineTrophy } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { logout } from '../../redux/user/userSlice';
import { IoEyeOutline } from "react-icons/io5";
import { PiCalculatorLight, PiUsersThree } from "react-icons/pi";
import { TbClipboardList } from "react-icons/tb";
import { CiShoppingBasket } from "react-icons/ci";

const Aside = ({className}) => {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout()); // Despacha la acción para eliminar el usuario del estado
    };
    
    const [showSubMenuTemporadas, setShowSubMenuTemporadas] = useState(false);
    const [showSubMenuSanciones, setShowSubMenuSanciones] = useState(false);
    const isActiveTemporadas = location.pathname.includes("/admin/temporadas");
    const isActiveSanciones = location.pathname.includes("/admin/sanciones");

    const toggleSubMenuTemporadas = () => {
        setShowSubMenuTemporadas(!showSubMenuTemporadas);
    };

    const toggleSubMenuSanciones = () => {
        setShowSubMenuSanciones(!showSubMenuSanciones);
    };

    //Mensaje bienvenida
    useEffect(() => {
        setShowSubMenuTemporadas(isActiveTemporadas);
        setShowSubMenuSanciones(isActiveSanciones);
    }, [isActiveTemporadas]);

    const [isOpen, setIsOpen] = useState(true);
    const isActive = location.pathname.startsWith('/admin/legajos');

    return (
        <>
            <AsideContainerStyled 
                className={className}
                initial={{ x: '0%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}
            >   
                <AsideMenuWrapper>
                    <AsideMenu>
                        {/* <NavLinkItem to={"/admin/dashboard"}>
                            <MdOutlineDashboard />
                            <p>Dashboard</p>
                        </NavLinkItem> */}
                        <NavLinkItem to={"/admin/productos"} end>
                            <CiShoppingBasket />
                            <p>Productos</p>
                        </NavLinkItem>
                        <NavLinkItem to={"/admin/productos/calculadora"}>
                            <PiCalculatorLight />
                            <p>Calculadora</p>
                        </NavLinkItem>
                        <NavLinkItem to={'/admin/usuarios'}>
                            <PiUsersThree />
                            <p>Usuarios</p>
                        </NavLinkItem>
                        <NavLinkItem to={'/admin/pedidos'}>
                            <TbClipboardList />
                            <p>Pedidos</p>
                        </NavLinkItem>
                    </AsideMenu>
                    <AsideMenu>
                        <NavLinkItem to='/'>
                            <IoEyeOutline />
                            <p>Ver web</p>
                        </NavLinkItem>
                        <NavLinkItem onClick={handleLogout} className='logout'>
                            <TbLogout2 />
                            <p>Cerrar sesion</p>
                        </NavLinkItem>
                    </AsideMenu>
                </AsideMenuWrapper>
            </AsideContainerStyled>
        </>
    );
};

export default Aside;
