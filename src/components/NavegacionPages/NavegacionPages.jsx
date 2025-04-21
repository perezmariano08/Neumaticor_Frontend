import React from 'react'
import { NavegacionPagesContainer } from './NavegacionPagesStyles'

const NavegacionPages = ({children}) => {
    return (
        <NavegacionPagesContainer>
            {children}
        </NavegacionPagesContainer>
    )
}

export default NavegacionPages