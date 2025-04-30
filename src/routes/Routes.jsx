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
import Usuarios from '../pages/Admin/Usuarios/Usuarios'
import UsuariosRegistrar from '../pages/Admin/Usuarios/UsuariosRegistrar'
import RequireAuth from './RequireAuth'
import Registrar from '../pages/Registrar/Registrar'
import Calculadora from '../pages/Admin/Calculadora/Calculadora'
import Pedidos from '../pages/Admin/Pedidos/Pedidos'
import PedidosDetalle from '../pages/Admin/Pedidos/PedidosDetalle'
import Cuenta from '../pages/Cuenta/Cuenta'
import CuentaPedidos from '../pages/Cuenta/CuentaPedidos'

const Routes = () => {
    return (
        <BrowserRouter>
            <RequireAuth> {/* << Aquí envolvemos */}
                <ReactDomRoutes>
                    <Route path='/' element={<Layout><Home/></Layout>} />
                    <Route path='/productos' element={<Layout><Productos/></Layout>} />
                    <Route path='/checkout' element={<Layout><Checkout/></Layout>} />
                    <Route path='/carrito' element={<Layout><Carrito/></Layout>} />
                    <Route path='/profile' element={<Layout><Profile /></Layout>} />
                    <Route path='/cuenta' element={<Layout><Cuenta/></Layout>} />
                    <Route path='/cuenta/pedidos' element={<Layout><CuentaPedidos/></Layout>} />
                    <Route path='/productos/:id_producto' element={<Layout><Producto/></Layout>} />
                    <Route path='*' element={<Layout><PageNotFound/></Layout>} />
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/registrar' element={<Registrar />} />

                    {/* Admin protegidas */}
                    <Route path='/admin' element={<RouteAdmin />}>
                        <Route path='dashboard' element={<LayoutAdmin><Dashboard /></LayoutAdmin>} />
                        <Route path='productos' element={<LayoutAdmin><AdminProductos /></LayoutAdmin>} />
                        <Route path='productos/calculadora' element={<LayoutAdmin><Calculadora /></LayoutAdmin>} />
                        <Route path='usuarios' element={<LayoutAdmin><Usuarios /></LayoutAdmin>} />
                        <Route path='usuarios/registrar' element={<LayoutAdmin><UsuariosRegistrar /></LayoutAdmin>} />
                        <Route path='pedidos' element={<LayoutAdmin><Pedidos /></LayoutAdmin>} />
                        <Route path='pedidos/:id_pedido' element={<LayoutAdmin><PedidosDetalle /></LayoutAdmin>} />
                    </Route>
                </ReactDomRoutes>
            </RequireAuth>
        </BrowserRouter>
    );
}

export default Routes