import { NavLink, useNavigate } from 'react-router-dom';
import { CuentaMenuItem, CuentaMenuStyled } from './CuentaStyles';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userSlice';
import { confirmDialog } from 'primereact/confirmdialog';

const CuentaMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const openConfirm = () => {
        confirmDialog({
            message: `¿Estás seguro que quieres salir?`,
            header: 'Cerrar sesión',
            accept: handleLogout
        });
    };

    const handleLogout = () => {
        navigate('/login')
        dispatch(logout()); // Despacha la acción para eliminar el usuario del estado
    };

    return (
        <CuentaMenuStyled>
            <CuentaMenuItem><NavLink to={'/cuenta'} end>Mi perfil</NavLink></CuentaMenuItem>
            <CuentaMenuItem><NavLink to={'/cuenta/pedidos'}>Pedidos</NavLink></CuentaMenuItem>
            <CuentaMenuItem onClick={openConfirm}><a>Salir</a></CuentaMenuItem>
        </CuentaMenuStyled>
    )
}

export default CuentaMenu