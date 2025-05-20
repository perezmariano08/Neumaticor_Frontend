import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button/Button";
import { formatPrice } from "../../utils/formatPrice";

import { RadioButton } from 'primereact/radiobutton';
        
import {
    CheckoutButtons,
    CheckoutContainer,
    CheckoutDivider,
    CheckoutFormaPagoItem,
    CheckoutFormaPagoWrapper,
    CheckoutItems,
    CheckoutItemsContainer,
    CheckoutPrice,
    CheckoutTarjetas,
    CheckoutTarjetasWrapper,
    CheckoutTitle,
    CheckoutWrapper,
} from "./CheckoutStyles";
import { clearCart } from "../../redux/cart/cartSlice";
import CheckoutItem from "./CheckoutItem";
import { useMemo, useState } from "react";
import Input from "../../components/UI/Input/Input";
import useForm from "../../hooks/useForm";
import { CuotasNx } from "../../utils/constants";
import Skeleton from "react-loading-skeleton";
import { useProductosConPrecio } from "../../api/productos/useProductos";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   

    const cartItems = useSelector(state => state.cart.cartItems);
    const { data: productosConPrecio, isLoading } = useProductosConPrecio();

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
    

    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        cuotas: 1,
        tarjeta: ''
    });

    const interesPorCuotas = {
        1: 0,      // Sin interés para una cuota
        3: 0.8,   // 10% de interés para 3 cuotas
        6: 0.17,   // 18% de interés para 6 cuotas
        9: 0.25,   // 25% de interés para 9 cuotas
        12: 0.34   // 33% de interés para 12 cuotas
    };

    const interesNaranja = {
        1: 0,      // Sin interés para una cuota
        4: 0,   // 10% de interés para 3 cuotas
        6: 0.8,   // 18% de interés para 6 cuotas
        10: 0.17,   // 25% de interés para 9 cuotas
    };

    const calcularCargos = () => {
        const cuotas = parseInt(formState.cuotas, 10);
        const interes = formState.tarjeta === 'nx' ? interesNaranja[cuotas] : interesPorCuotas[cuotas] || 0;        
        const totalConInteres = precioTotal * (1 + interes);
        const montoPorCuota = totalConInteres / cuotas;
    
        return {
            totalConInteres,
            montoPorCuota
        };
    };

    const { totalConInteres, montoPorCuota } = calcularCargos();


    
    // Estado para la opción de pago seleccionada
    const [opcionPago, setOpcionPago] = useState('');

    const handleOpcionPagoChange = (e) => {
        setOpcionPago(e.target.value);
    };

    // Función para generar el mensaje de WhatsApp
    const generarMensajeWhatsApp = (cartItems, precioTotal) => {
        let mensaje = "_¡Hola! Te paso el resumen de mi pedido_ %0A%0A"; // Encabezado del mensaje

        mensaje += `*Fecha:* ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}hs%0A`;
        {
            user ? mensaje += `*Usuario:* ${user.nombre}%0A%0A` : mensaje += `*Usuario:* Cliente Final %0A%0A`
        }
        mensaje += `*Total:* $${formatPrice(cartItems)}%0A%0A`;
        mensaje += "_Mi pedido es_%0A%0A"; // Título del pedido

        cartItems.forEach((item) => {
            mensaje += `*${item.descripcion}* %0A${item.quantity}x - $${formatPrice(
                item.precio * item.quantity)
            }%0A%0A`; // Detalle del producto
        });

        

        if (opcionPago === "Efectivo") {
            mensaje += `*Metodo de pago:* Efectivo %0A%0A`;
        } else {
            mensaje += `*Metodo de pago:* ${opcionPago} ${
                formState.tarjeta === "nx" ? "Naranja X" :
                formState.tarjeta === "visa" ? "Visa" :
                formState.tarjeta === "master" ? "MasterCard" :
                "false"
            }%0A%0A`;
        }
        

        mensaje += `*TOTAL:* $${formatPrice(precioTotal)}%0A%0A`;

        if (opcionPago === "Credito"){
            mensaje += `*TOTAL CON INTERES:* $${formatPrice(totalConInteres)} (${formState.cuotas}x $${formatPrice(montoPorCuota)}) %0A%0A`;
        }
        
        
        mensaje += "_Espero tu respuesta para confirmar mi pedido_";

        return mensaje;
    };

    const finalizarCompra = () => {
        const numeroWhatsApp = "5493517649357"; // El número al que se enviará el mensaje
        const mensaje = generarMensajeWhatsApp(cartItems, precioTotal);
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensaje}`;

        window.open(url, "_blank"); // Abrir WhatsApp Web en una nueva pestaña/ventana
    };
        

    return (
        <CheckoutContainer>
            <CheckoutWrapper>
                <CheckoutTitle>Mi pedido</CheckoutTitle>
                {
                    !cartItems?.length ?
                        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                            <p>No hay productos en el carrito.</p>
                            <Button
                                onClick={() => {
                                    navigate('/productos'); // Llamar a la función para enviar el mensaje de WhatsApp
                                }}
                            >
                                Volver a la tienda
                            </Button>
                        </div> 
                    :
                    <>
                        <CheckoutItemsContainer>
                            <CheckoutItems>
                                {
                                    productosCarrito?.map((item, index) => {
                                        return <CheckoutItem key={`${item.id_producto}-${index}`} {...item} isLoading={isLoading}/>;
                                    })
                                }
                            </CheckoutItems>
                        </CheckoutItemsContainer>
                        <CheckoutPrice>
                            <h4>Total:</h4>
                            {
                                !isLoading ? <span>${formatPrice(precioTotal)}</span> : <span><Skeleton width={100}/></span>
                            }
                            
                        </CheckoutPrice>
                        {/* <CheckoutTarjetasWrapper>
                            <span>Tarjetas disponibles</span>
                            <CheckoutTarjetas>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Naranja_X.png" />
                            </CheckoutTarjetas>
                            <p>Condiciones:</p>
                        </CheckoutTarjetasWrapper> */}
                        
                        <div style={{display: 'flex', gap: '15px', alignItems: 'center', padding: '40px 0 20px 0'}}>
                            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                <RadioButton
                                    inputId="debito" 
                                    name="debito"
                                    type="radio" 
                                    value="Debito" 
                                    checked={opcionPago === 'Debito'}
                                    onChange={handleOpcionPagoChange} 
                                />
                                <label htmlFor="debito">Tarjeta de Débito</label>
                            </div>
                            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                <RadioButton
                                    inputId="credito" 
                                    name="credito"
                                    type="radio" 
                                    value="Credito" 
                                    checked={opcionPago === 'Credito'}
                                    onChange={handleOpcionPagoChange} 
                                />
                                <label htmlFor="credito">Tarjeta de Crédito</label>
                            </div>
                            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                <RadioButton
                                    inputId="efectivo" 
                                    name="efectivo"
                                    type="radio" 
                                    value="Efectivo" 
                                    checked={opcionPago === 'Efectivo'}
                                    onChange={handleOpcionPagoChange} 
                                />
                                <label htmlFor="efectivo">Efectivo</label>
                            </div>
                        </div>
                        {(opcionPago === 'Debito') && (
                            <CheckoutFormaPagoWrapper>
                                <CheckoutFormaPagoItem>
                                    <p>Tarjeta:</p>
                                </CheckoutFormaPagoItem>
                                    <CheckoutFormaPagoItem>
                                        <p>Cuotas:</p>

                                    </CheckoutFormaPagoItem>
                                    
                                    {/* Mostrar información de cargos a realizar */}
                                    <CheckoutFormaPagoItem className="cargos">
                                        <p>Cargos a realizar:</p>
                                        {opcionPago === 'Credito' ? (
                                            <span>
                                                {formState.cuotas} cuota{formState.cuotas > 1 ? 's' : ''} de ${formatPrice(montoPorCuota)} <br />
                                                Total con interés: ${formatPrice(totalConInteres)}
                                            </span>
                                        ) : (
                                            <span>1 cuota de ${formatPrice(precioTotal)}</span>
                                        )}
                                    </CheckoutFormaPagoItem>                
                            </CheckoutFormaPagoWrapper>
                        )}
                        {(opcionPago === 'Credito') && (
                            <CheckoutFormaPagoWrapper>
                                <CheckoutFormaPagoItem>
                                    <p>Tarjeta:</p>
                                    
                                </CheckoutFormaPagoItem>
                                {
                                    formState.tarjeta === "nx" 
                                    ? <>
                                        <CheckoutFormaPagoItem>
                                            <p>Cuotas:</p>
                                          
                                        </CheckoutFormaPagoItem>
                                        {/* Mostrar información de cargos a realizar */}
                                        <CheckoutFormaPagoItem className="cargos">
                                            <p>Cargos a realizar:</p>
                                            {opcionPago === 'Credito' ? (
                                                <span>
                                                    {formState.cuotas} cuota{formState.cuotas > 1 ? 's' : ''} de ${formatPrice(montoPorCuota)} <br />
                                                    Total con interés: ${formatPrice(totalConInteres)}
                                                </span>
                                            ) : (
                                                <span>1 cuota de ${formatPrice(precioTotal)}</span>
                                            )}
                                        </CheckoutFormaPagoItem>
                                    </>
                                    : <>
                                        <CheckoutFormaPagoItem>
                                            <p>Cuotas:</p>
                                            
                                        </CheckoutFormaPagoItem>
                                        
                                        {/* Mostrar información de cargos a realizar */}
                                        <CheckoutFormaPagoItem className="cargos">
                                            <p>Cargos a realizar:</p>
                                            {opcionPago === 'Credito' ? (
                                                <span>
                                                    {formState.cuotas} cuota{formState.cuotas > 1 ? 's' : ''} de ${formatPrice(montoPorCuota)} <br />
                                                    Total con interés: ${formatPrice(totalConInteres)}
                                                </span>
                                            ) : (
                                                <span>1 cuota de ${formatPrice(precioTotal)}</span>
                                            )}
                                        </CheckoutFormaPagoItem>
                                    </>
                                }
                                
                            </CheckoutFormaPagoWrapper>
                        )}
                        <CheckoutButtons>
                            <Button
                                background="red"
                                color="white"
                                disabled={!cartItems.length}
                                onClick={() => dispatch(clearCart())}
                            >
                                Vaciar carrito
                            </Button>
                            <Button
                                disabled={!cartItems.length || !opcionPago}
                                onClick={() => {
                                finalizarCompra(); // Llamar a la función para enviar el mensaje de WhatsApp
                                }}
                            >
                                <FaWhatsapp />
                                Finalizar pedido
                            </Button>
                        </CheckoutButtons>
                    </> 
                }
                
            </CheckoutWrapper>
        </CheckoutContainer>
    );
};

export default Checkout;
