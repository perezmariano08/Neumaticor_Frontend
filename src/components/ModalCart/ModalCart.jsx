import { useNavigate } from "react-router-dom";
import { ModalCartButtons, ModalCartContainerStyled, ModalCartDivider, ModalCartItems, ModalCartItemsContainer, ModalCartPrice, ModalCartTitle, ModalOverlayStyled } from './ModalCartStyles';
import { FaAngleLeft, FaWhatsapp } from 'react-icons/fa6';
import Button from '../UI/Button/Button';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, toggleHiddenCart } from '../../redux/cart/cartSlice';
import { AnimatePresence } from 'framer-motion';
import ModalCartItem from './ModalCartItem';
import { formatPrice } from '../../utils/formatPrice';

const ModalCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hiddenCart = useSelector((state) => state.cart.hidden);
    const { cartItems } = useSelector((state) => state.cart);
    
    // Calcular precio total
    const totalPrice = cartItems.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
    }, 0);

    // Función para generar el mensaje de WhatsApp
    const generarMensajeWhatsApp = (cartItems, totalPrice) => {
        let mensaje = "_¡Hola! Te paso el resumen de mi pedido_ %0A%0A"; // Encabezado del mensaje
        
        mensaje += `*Fecha:* ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}hs%0A`;
        mensaje += `*Total:* $${totalPrice}%0A%0A`;
        mensaje += "_Mi pedido es_%0A%0A"; // Título del pedido
    
        cartItems.forEach(item => {
            mensaje += `*${item.title}* %0A${item.quantity}x - $${item.price * item.quantity}%0A%0A`; // Detalle del producto
        });
    
        mensaje += `*TOTAL:* $${totalPrice}%0A%0A`;
        mensaje += "_Espero tu respuesta para confirmar mi pedido_";
    
        return mensaje;
    };

    const finalizarCompra = () => {
        const numeroWhatsApp = "5493516754319"; // El número al que se enviará el mensaje
        const mensaje = generarMensajeWhatsApp(cartItems, totalPrice);
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensaje}`;
        console.log(url);
        
        window.open(url, "_blank"); // Abrir WhatsApp Web en una nueva pestaña/ventana
    };
    

    return (
        <>
            {!hiddenCart && (
                <ModalOverlayStyled onClick={() => dispatch(toggleHiddenCart())} />
            )}
            <AnimatePresence>
                {!hiddenCart && (
                <ModalCartContainerStyled
                    initial={{ translateX: 600 }}
                    animate={{ translateX: 0 }}
                    exit={{ translateX: 600 }}
                    transition={{ type: "spring", damping: 27 }}
                    key="cart-modal"
                > 
                    <ModalCartTitle>
                        <FaAngleLeft onClick={() => dispatch(toggleHiddenCart())} className='icon-close'/>
                        <h3>Carrito de compras</h3>
                    </ModalCartTitle>
                    <ModalCartDivider/>
                    <ModalCartItemsContainer>
                        <ModalCartItems>
                            {
                                cartItems?.length ? (
                                    cartItems.map((item) => {
                                        return <ModalCartItem key={item.id} {...item} />
                                    })
                                ) : (
                                    <p>No hay productos en el carrito.</p>
                                )
                            }
                        </ModalCartItems>
                    </ModalCartItemsContainer>
                    <ModalCartDivider/>
                    <ModalCartPrice>
                        <h4>Total:</h4>
                        <span>${formatPrice(totalPrice)}</span>
                    </ModalCartPrice>
                    <ModalCartDivider/>
                    <ModalCartButtons>
                        <Button 
                            background='red' 
                            disabled={!cartItems.length} 
                            onClick={() => dispatch(clearCart())}
                        >Vaciar carrito</Button>
                        <Button
                            disabled={!cartItems.length}
                            onClick={() => {
                                finalizarCompra(); // Llamar a la función para enviar el mensaje de WhatsApp
                                dispatch(toggleHiddenCart());
                            }}
                        >
                            <FaWhatsapp/>
                            Finalizar pedido
                        </Button>
                    </ModalCartButtons>
                </ModalCartContainerStyled>
            )}
            </AnimatePresence>
        </>
    );
}

export default ModalCart;
