import React, { useMemo, useState } from 'react'
import { CarritoAccordionContent, CarritoAccordionContentButton, CarritoContainer, CarritoCupon, CarritoItems, CarritoItemsWrapper, CarritoMain, CarritoPedidoDetallesWrapper, CarritoResumenButtons, CarritoResumenSubtotal, CarritoResumenTitulo, CarritoResumenTotal, CarritoResumenWrapper, CarritoTitulo, CarritoWrapper } from './CarritoStyles'
import NavegacionPages from '../../components/NavegacionPages/NavegacionPages'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import Button from '../../components/UI/Button/Button'
import ProductCardCarrito from '../../components/ProductCardCarrito/ProductCardCarrito'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { BsTags } from "react-icons/bs";
import InputText from '../../components/UI/InputText/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { useProductosConPrecio } from '../../hooks/api/useProductos'
import { formatPrice } from '../../utils/formatPrice'
import Skeleton from 'react-loading-skeleton'
import { clearCart } from '../../redux/cart/cartSlice'

const Carrito = () => {
    const [value, setValue] = useState('');
    const cartItems = useSelector(state => state.cart.cartItems);
    const { data: productosConPrecio, isLoading } = useProductosConPrecio();
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const productosCarrito = useMemo(() => {
        return cartItems.map(item => {
        const producto = productosConPrecio?.find(p => p.id_producto === item.id_producto);

        return {
            ...producto,
            quantity: item.quantity,
            subtotal: (producto?.precio || 0) * item.quantity
        };
        });
    }, [cartItems, productosConPrecio, isLoading]);

    
    const precioTotal = useMemo(() => {
        return productosCarrito.reduce((total, item) => total + item.subtotal, 0);
    }, [productosCarrito]);

    return (
        <CarritoContainer>
            <CarritoWrapper>
                <NavegacionPages>
                    <NavLink to={'/'}>Inicio</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={'/carrito'}>Carrito</NavLink>
                </NavegacionPages>

                {
                    cartItems.length > 0 ? 
                    <>
                    <CarritoTitulo>Mis productos en el carrito</CarritoTitulo>
                    <CarritoMain>
                        <CarritoItemsWrapper>
                            <CarritoItems>
                                {
                                    productosCarrito?.map((item, index) => {
                                        return <ProductCardCarrito key={`${item.id_producto}-${index}`} {...item} isLoading={isLoading}/>;
                                    })
                                }
                            </CarritoItems>
                            <Button 
                                disabled={!cartItems.length}
                                onClick={() => dispatch(clearCart())}
                            >
                                Vaciar carrito
                            </Button>
                        </CarritoItemsWrapper>
                        <CarritoPedidoDetallesWrapper>
                            <Accordion>
                                <AccordionTab header={<CarritoCupon><BsTags /><span>¿Tenes cupon de descuento?</span></CarritoCupon>}>
                                    <CarritoAccordionContent>
                                        <p>Codigo promocional</p>
                                        <CarritoAccordionContentButton>
                                            <InputText 
                                                value={value} 
                                                onChange={(e) => setValue(e.target.value)}
                                                placeholder={'Codigo'}
                                            />
                                            <Button>Aplicar</Button>
                                        </CarritoAccordionContentButton>
                                    </CarritoAccordionContent>
                                </AccordionTab>
                            </Accordion>
                            <CarritoResumenWrapper>
                                <CarritoResumenTitulo>
                                    Resumen del pedido
                                </CarritoResumenTitulo>
                                <CarritoResumenSubtotal>
                                    <p>Subtotal:</p>
                                    {
                                        !isLoading ? <p>${formatPrice(precioTotal)}</p> : <p><Skeleton width={100}/></p>
                                    }
                                </CarritoResumenSubtotal>
                                <CarritoResumenTotal>
                                    <p>Total:</p>
                                    {
                                        !isLoading ? <p>${formatPrice(precioTotal)}</p> : <p><Skeleton width={130}/></p>
                                    }
                                </CarritoResumenTotal>
                                <CarritoResumenButtons>
                                    <Button onClick={() => navigate('/profile')}>Continuar pedido</Button>
                                    <NavLink to={'/productos'}><LiaAngleLeftSolid />Elegir más productos</NavLink>
                                </CarritoResumenButtons>
                            </CarritoResumenWrapper>
                        </CarritoPedidoDetallesWrapper>
                    </CarritoMain>
                    </>
                    : <>
                    <CarritoTitulo>No hay productos en el carrito</CarritoTitulo>
                    <Button
                        onClick={() => {
                            navigate('/productos'); // Llamar a la función para enviar el mensaje de WhatsApp
                        }}
                    >
                        Volver a la tienda
                    </Button>
                    </>
                }
                
            </CarritoWrapper>
        </CarritoContainer>
    )
}

export default Carrito