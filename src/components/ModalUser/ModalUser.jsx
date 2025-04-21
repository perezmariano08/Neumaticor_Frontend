import React from 'react'
import { ModalUserWrapper } from './ModalUserStyles'
import Button from '../UI/Button/Button';
import { logout } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ModalUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    
    const handleLogout = () => {
        navigate('/login')
        dispatch(logout()); // Despacha la acción para eliminar el usuario del estado
    };
    
    return (
        <ModalUserWrapper>
            <p>{user?.nombre}</p>
            <Button background='black' color='white' onClick={handleLogout}>Cerrar Sesion</Button>
        </ModalUserWrapper>
    )
}

export default ModalUser