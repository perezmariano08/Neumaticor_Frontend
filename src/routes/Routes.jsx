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
import ListasPrecios from '../pages/Admin/ListasPrecios/ListasPrecios'
import ListasPreciosDetalle from '../pages/Admin/ListasPrecios/ListasPreciosDetalle'
import ProductosCrear from '../pages/Admin/Productos/ProductosCrear'
import Search from '../pages/Search/Search'
import ProductosEditar from '../pages/Admin/Productos/ProductosEditar'
import UsuariosDetalle from '../pages/Admin/Usuarios/UsuariosDetalle'
import PagosRegistrar from '../pages/Admin/Pagos/PagosRegistrar'
import Pagos from '../pages/Admin/Pagos/Pagos'

const Routes = () => {
    return (
        <BrowserRouter>
            <RequireAuth> {/* << Aquí envolvemos */}
                <ReactDomRoutes>
                    <Route path='/' element={<Layout><Home/></Layout>} />
                    <Route path='/buscar/:termino' element={<Layout><Search/></Layout>} />
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
                        <Route path='productos' element={<LayoutAdmin title='Productos'><AdminProductos /></LayoutAdmin>} />
                        <Route path='productos/calculadora' element={<LayoutAdmin title='Calculadora'><Calculadora /></LayoutAdmin>} />
                        <Route path='productos/crear' element={<LayoutAdmin title='Crear producto'><ProductosCrear /></LayoutAdmin>} />
                        <Route path='productos/editar/:id_producto' element={<LayoutAdmin title='Editar producto'><ProductosEditar /></LayoutAdmin>} />
                        <Route path='usuarios' element={<LayoutAdmin><Usuarios /></LayoutAdmin>} />
                        <Route path='usuarios/:id_usuario' element={<LayoutAdmin><UsuariosDetalle /></LayoutAdmin>} />
                        <Route path='usuarios/registrar' element={<LayoutAdmin><UsuariosRegistrar /></LayoutAdmin>} />
                        <Route path='pedidos' element={<LayoutAdmin><Pedidos /></LayoutAdmin>} />
                        <Route path='pedidos/:id_pedido' element={<LayoutAdmin><PedidosDetalle /></LayoutAdmin>} />
                        <Route path='listas-precios' element={<LayoutAdmin><ListasPrecios /></LayoutAdmin>} />
                        <Route path='listas-precios/:id_lista_precio' element={<LayoutAdmin><ListasPreciosDetalle /></LayoutAdmin>} />
                        <Route path='pagos' element={<LayoutAdmin><Pagos /></LayoutAdmin>} />
                        <Route path='pagos/registrar' element={<LayoutAdmin><PagosRegistrar /></LayoutAdmin>} />
                    </Route>
                </ReactDomRoutes>
            </RequireAuth>
        </BrowserRouter>
    );
}

export default Routes