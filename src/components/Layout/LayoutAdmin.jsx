import React, { useEffect } from 'react'
import { LayoutAdminContainer, LayoutAdminContent, LayoutAdminContentHeader, LayoutAdminUserWrapper } from './LayoutStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import Aside from '../Aside/Aside'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGES_URL } from '../../utils/constants'
import { MdOutlineLogout } from "react-icons/md";
import { logout } from '../../redux/user/userSlice'

const LayoutAdmin = ({ children, title }) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout()); // Despacha la acción para eliminar el usuario del estado
    };
    
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])

    return (
        <>
            <LayoutAdminContainer>
                <Aside/>
                <LayoutAdminContent>
                    <LayoutAdminContentHeader>
                        <h2>{title}</h2>
                        <LayoutAdminUserWrapper>
                            <img src={`${IMAGES_URL}/images/user-default.png`} />
                            <p>{user.nombre} {user.apellido}</p>
                            <MdOutlineLogout onClick={handleLogout} />
                        </LayoutAdminUserWrapper>
                    </LayoutAdminContentHeader>
                    {children}
                </LayoutAdminContent>
            </LayoutAdminContainer>
        </>
    )
}

export default LayoutAdmin