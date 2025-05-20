import React from 'react'
import { useSelector } from 'react-redux';
import { CuentaContainer, CuentaPedidoHeader, CuentaPedidoHeaderEstado, CuentaPedidoHeaderItem, CuentaPedidoHeaderItems, CuentaPedidoMain, CuentaPedidoProductoCard, CuentaPedidoProductoCardTexto, CuentaPedidosWrapper, CuentaPedidoWrapper, CuentaWrapper } from './CuentaStyles';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import CuentaMenu from './CuentaMenu';
import { IMAGES_URL } from '../../utils/constants';
import { usePedidoDetalleUsuario, usePedidosUsuario } from '../../api/pedidos/usePedidos';

const CuentaPedidos = () => {
    
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux
    const { data: pedidos, error, isLoading } = usePedidosUsuario(user?.id_usuario);
    const { data: pedidosDetalle, error: errorPedidosDetalle, isLoading: loadingPedidosDetalle } = usePedidoDetalleUsuario(user?.id_usuario);

    return (
        <CuentaContainer>
            <CuentaWrapper>
                <CuentaMenu />
                {
                    pedidos?.length > 0 ? <CuentaPedidosWrapper>
                    {
                        pedidos?.map((p, index) => (
                            <CuentaPedidoWrapper key={p.id_pedido} style={{width: '100%'}}>
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
                                    {p.estado === "F" && <CuentaPedidoHeaderEstado className='green'>
                                        <p>Finalizado</p>
                                    </CuentaPedidoHeaderEstado>}
                                    {p.estado === "P" && <CuentaPedidoHeaderEstado className='orange'>
                                        <p>Pendiente</p>
                                    </CuentaPedidoHeaderEstado>}
                                    {p.estado === "C" && <CuentaPedidoHeaderEstado className='blue'>
                                        <p>Confirmado</p>
                                    </CuentaPedidoHeaderEstado>}
                                </CuentaPedidoHeader>
                                <CuentaPedidoMain>
                                    {
                                        pedidosDetalle
                                        ?.filter((pe) => pe.id_pedido === p.id_pedido)
                                        .map((pe) => (
                                            <CuentaPedidoProductoCard key={pe.id_producto}>
                                                <img alt={pe.img} src={pe.img ? `${IMAGES_URL}/productos/${pe.marca.toLowerCase().replace(/\s+/g, '-')}/${pe.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
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