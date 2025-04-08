import React from 'react'
import { BrowserRouter, Routes as ReactDomRoutes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import Productos from '../pages/Productos/Productos'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Producto from '../pages/Producto/Producto'
import Checkout from '../pages/Checkout/Checkout'
import Login from '../pages/Login/Login'
const Routes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <ReactDomRoutes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/productos' element={<Productos/>} />
                    <Route path='/checkout' element={<Checkout/>} />
                    <Route path='/productos/:productId' element={<Producto/>} />
                    <Route path='*' element={<PageNotFound/>} />
                    <Route path='/login' element={<Login/>} />
                </ReactDomRoutes>
            </Layout>
        </BrowserRouter>
    )
}

export default Routes