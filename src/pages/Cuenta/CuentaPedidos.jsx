import React from 'react'
import { usePedidoDetalleUsuario, usePedidos, usePedidosUsuario } from '../../hooks/api/usePedidos';
import { useSelector } from 'react-redux';
import { CuentaContainer, CuentaPedidoHeader, CuentaPedidoHeaderEstado, CuentaPedidoHeaderItem, CuentaPedidoHeaderItems, CuentaPedidoMain, CuentaPedidoProductoCard, CuentaPedidoProductoCardTexto, CuentaPedidosWrapper, CuentaPedidoWrapper, CuentaWrapper } from './CuentaStyles';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import CuentaMenu from './CuentaMenu';
import { IMAGES_URL } from '../../utils/constants';

const CuentaPedidos = () => {
    
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux
    const { data: pedidos, error, isLoading } = usePedidosUsuario(user?.id_usuario);
    const { data: pedidosDetalle, error:errorPedidosDetalle, isLoading: loadingPedidosDetalle } = usePedidoDetalleUsuario(user?.id_usuario);

    console.log(pedidos);
    console.log(pedidosDetalle);

    return (
        <CuentaContainer>
            <CuentaWrapper>
                <CuentaMenu />
                {
                    pedidos?.length > 0 ? <CuentaPedidosWrapper>
                    {
                        pedidos?.map((p, index) => (
                            <CuentaPedidoWrapper key={index} style={{width: '100%'}}>
                                <CuentaPedidoHeader>
                                    <CuentaPedidoHeaderItems>
                                        <CuentaPedidoHeaderItem>
                                            <span>Fecha del pedido</span>
                                            <p>{formatDate(p.fecha)}</p>
                                        </CuentaPedidoHeaderItem>
                                        <CuentaPedidoHeaderItem>
                                            <span>Total</span>
                                            <p>${formatPrice(p.total)}</p>
                                        </CuentaPedidoHeaderItem>
                                    </CuentaPedidoHeaderItems>
                                    <CuentaPedidoHeaderEstado>
                                        <p>{p.estado}</p>
                                    </CuentaPedidoHeaderEstado>
                                </CuentaPedidoHeader>
                                <CuentaPedidoMain>
                                    {
                                        pedidosDetalle
                                        ?.filter((pe) => pe.id_pedido === p.id_pedido)
                                        .map((pe) => (
                                            <CuentaPedidoProductoCard key={pe.id_oroducto}>
                                                <img alt={pe.img} src={pe.img ? `${IMAGES_URL}/productos/${pe.marca.toLowerCase()}/${pe.vehiculo.toLowerCase()}/${pe.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                                                <CuentaPedidoProductoCardTexto>
                                                    <h2>{pe.descripcion}</h2>
                                                    <p>{pe.cantidad}x  ${formatPrice(pe.precio_unitario)}</p>
                                                </CuentaPedidoProductoCardTexto>
                                            </CuentaPedidoProductoCard>
                                        ))
                                    }
                                </CuentaPedidoMain>
                            </CuentaPedidoWrapper>
                        ))
                    }
                </CuentaPedidosWrapper> : <p>No hay pedidos.</p>
                }
                
            </CuentaWrapper>
        </CuentaContainer>
    )
}

export default CuentaPedidos