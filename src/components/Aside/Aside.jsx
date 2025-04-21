import React, { useEffect, useState } from 'react';
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdOutlineDashboard } from "react-icons/md";
import { AsideContainerStyled, AsideHeader, AsideMenu, AsideMenuWrapper, MenuItem, NavLinkAngleDown, NavLinkItem, SubMenu, SubMenuItem } from './AsideStyles';
import Divider from '../Divider/Divider';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiBlock, BiSearch } from "react-icons/bi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaRegNewspaper } from "react-icons/fa6";
import { IMAGES_URL } from "../../utils/constants";

const Aside = ({className}) => {
    const location = useLocation();
    
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
                <AsideHeader>
                    <img src={`${IMAGES_URL}/images/logos/logotipo-blanco.png`} alt="" />
                </AsideHeader>    
                <AsideMenuWrapper>
                    <AsideMenu>
                        <NavLinkItem to={"/admin/dashboard"}>
                            <MdOutlineDashboard />
                            <p>Dashboard</p>
                        </NavLinkItem>
                        <NavLinkItem to={"/admin/productos"}>
                            <HiOutlineTrophy />
                            <p>Productos</p>
                        </NavLinkItem>
                        {/* <NavLinkItem to={'/admin/sanciones/expulsados'}>
                            <BiBlock />
                            <p>Sanciones</p>
                        </NavLinkItem>
                        <NavLinkItem to={'/admin/noticias'}>
                            <FaRegNewspaper />
                            <p>Noticias</p>
                        </NavLinkItem>
                        <NavLinkItem to={'/admin/usuarios'}>
                            <FaUsers />
                            <p>Usuarios</p>
                        </NavLinkItem>
                        <NavLinkItem 
                            to='/admin/legajos/jugadores' 
                            className={isActive ? 'active' : ''}
                        >
                            <LiaClipboardListSolid />
                            <p>Legajos</p>
                        </NavLinkItem> */}
                    </AsideMenu>
                </AsideMenuWrapper>
            </AsideContainerStyled>
        </>
    );
};

export default Aside;
