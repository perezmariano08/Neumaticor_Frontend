import React, { useEffect } from 'react'
import { LayoutAdminContainer, LayoutAdminContent } from './LayoutStyles'
import { useLocation } from 'react-router-dom'
import Aside from '../Aside/Aside'

const LayoutAdmin = ({ children }) => {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])

    return (
        <>
            <LayoutAdminContainer>
                <Aside/>
                <LayoutAdminContent>
                    {children}
                </LayoutAdminContent>
            </LayoutAdminContainer>
        </>
    )
}

export default LayoutAdmin