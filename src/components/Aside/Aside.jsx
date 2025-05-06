import React, { useEffect, useState } from 'react';
import { AccordionMenu, AccordionMenuWrapper, AsideContainerStyled, AsideHeader, AsideMenu, AsideMenuWrapper, MenuItem, NavLinkAngleDown, NavLinkItem, SubMenu, SubMenuItem } from './AsideStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineTrophy } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { logout } from '../../redux/user/userSlice';
import { IoEyeOutline } from "react-icons/io5";
import { PiCalculatorLight, PiUsersThree } from "react-icons/pi";
import { TbClipboardList } from "react-icons/tb";
import { CiShoppingBasket } from "react-icons/ci";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TbReportMoney } from "react-icons/tb";

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

    const isActiveProductos = location.pathname.startsWith('/admin/productos');


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
                        <Accordion activeIndex={isActiveProductos ? 0 : null}>
                            <AccordionTab 
                                header={
                                <div className='tab'>
                                    <CiShoppingBasket />
                                    <p>Productos</p>
                                </div>
                                }
                            >   
                                <AccordionMenuWrapper>
                                    <AccordionMenu to={'/admin/productos'} end>
                                        Listar productos
                                    </AccordionMenu>
                                    <AccordionMenu to={'/admin/productos/calculadora'}>
                                        Calculadora
                                    </AccordionMenu>
                                </AccordionMenuWrapper>
                            </AccordionTab>
                        </Accordion>
                        <NavLinkItem to={'/admin/listas-precios'}>
                            <TbReportMoney />
                            <p>Listas de precios</p>
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
                    <AsideMenu className='bottom'>
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
