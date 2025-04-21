import React from 'react'
import { BrowserRouter, Routes as ReactDomRoutes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import Productos from '../pages/Productos/Productos'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Producto from '../pages/Producto/Producto'
import Checkout from '../pages/Checkout/Checkout'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import AdminProductos from '../pages/Admin/Productos/Productos'
import RouteAdmin from './RouteAdmin'
import LayoutAdmin from '../components/Layout/LayoutAdmin'
import Carrito from '../pages/Carrito/Carrito'
import Profile from '../pages/Profile/Profile'

const Routes = () => {
    return (
        <BrowserRouter>
                <ReactDomRoutes>
                    <Route path='/' element={<Layout><Home/></Layout>} />
                    <Route path='/productos' element={<Layout><Productos/></Layout>} />
                    <Route path='/checkout' element={<Layout><Checkout/></Layout>} />
                    <Route path='/carrito' element={<Layout><Carrito/></Layout>} />
                    <Route path='/profile' element={<Layout><Profile/></Layout>} />
                    <Route path='/productos/:id_producto' element={<Layout><Producto/></Layout>} />
                    <Route path='*' element={<Layout><PageNotFound/></Layout>} />
                    <Route path='/login' element={<Layout><Login/></Layout>} />

                    {/* Agrupación de rutas admin protegidas */}
                    <Route path='/admin' element={<RouteAdmin />}>
                        <Route path='dashboard' element={<LayoutAdmin><Dashboard /></LayoutAdmin>} />
                        <Route path='productos' element={<LayoutAdmin><AdminProductos /></LayoutAdmin>} />
                    </Route>
                </ReactDomRoutes>
        </BrowserRouter>
    )
}

export default Routes