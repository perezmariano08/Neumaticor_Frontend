import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { ContentContainerStyled } from './LayoutStyles'
import Footer from '../Footer/Footer'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])
    return (
        <>
            <Navbar/>
            <ContentContainerStyled>{children}</ContentContainerStyled>
            <Footer/>
        </>
    )
}

export default Layout