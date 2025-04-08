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
import Select from "../../components/UI/Select/Select";
import { useState } from "react";
import Input from "../../components/UI/Input/Input";
import useForm from "../../hooks/useForm";
import { CuotasNx } from "../../utils/constants";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    
    // Calcular precio total
    const totalPrice = cartItems.reduce((acc, item) => {
        if (user) {
            return (acc += item.precio_cuenta * item.quantity);
        } else {
            return (acc += item.precio * item.quantity);
        }
    }, 0);
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        cuotas: 1,
        tarjeta: ''
    });

    const interesPorCuotas = {
        1: 0,      // Sin interés para una cuota
        3: 0.8,   // 10% de interés para 3 cuotas
        6: 0.20,   // 18% de interés para 6 cuotas
        9: 0.25,   // 25% de interés para 9 cuotas
        12: 0.34   // 33% de interés para 12 cuotas
    };

    const interesNaranja = {
        1: 0,      // Sin interés para una cuota
        4: 0,   // 10% de interés para 3 cuotas
        6: 0.8,   // 18% de interés para 6 cuotas
        10: 0.10,   // 25% de interés para 9 cuotas
        12: 0.25   // 33% de interés para 12 cuotas
    };

    const calcularCargos = () => {
        const cuotas = parseInt(formState.cuotas, 10);
        const interes = formState.tarjeta === 'nx' ? interesNaranja[cuotas] : interesPorCuotas[cuotas] || 0;        
        const totalConInteres = totalPrice * (1 + interes);
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
    const generarMensajeWhatsApp = (cartItems, totalPrice) => {
        let mensaje = "_¡Hola! Te paso el resumen de mi pedido_ %0A%0A"; // Encabezado del mensaje

        mensaje += `*Fecha:* ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}hs%0A`;
        {
            user ? mensaje += `*Usuario:* ${user.nombre}%0A%0A` : mensaje += `*Usuario:* Cliente Final %0A%0A`
        }
        mensaje += `*Total:* $${totalPrice}%0A%0A`;
        mensaje += "_Mi pedido es_%0A%0A"; // Título del pedido

        cartItems.forEach((item) => {
        mensaje += `*${item.descripcion}* %0A${item.quantity}x - $${
            item.precio * item.quantity
        }%0A%0A`; // Detalle del producto
        });

        mensaje += `*TOTAL:* $${totalPrice}%0A%0A`;
        mensaje += "_Espero tu respuesta para confirmar mi pedido_";

        return mensaje;
    };

    const finalizarCompra = () => {
        const numeroWhatsApp = "5493517649357"; // El número al que se enviará el mensaje
        const mensaje = generarMensajeWhatsApp(cartItems, totalPrice);
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensaje}`;

        window.open(url, "_blank"); // Abrir WhatsApp Web en una nueva pestaña/ventana
    };
    
    console.log(cartItems);
    

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
                                    cartItems.map((item) => {
                                        return <CheckoutItem key={item.id_producto} {...item} />;
                                    })
                                }
                            </CheckoutItems>
                        </CheckoutItemsContainer>
                        <CheckoutDivider />
                        <CheckoutPrice>
                            <h4>Total:</h4>
                            <span>${formatPrice(totalPrice)}</span>
                        </CheckoutPrice>
                        <CheckoutTarjetasWrapper>
                            <span>Tarjetas disponibles</span>
                            <CheckoutTarjetas>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Naranja_X.png" />
                            </CheckoutTarjetas>
                            <p>Condiciones:</p>
                        </CheckoutTarjetasWrapper>
                        
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
                                    <Select
                                        name={'tarjeta'}
                                        data={[
                                            { value: 'visa', tarjeta: 'VISA' },
                                            { value: 'master', tarjeta: 'MASTERCARD' },
                                        ]}
                                        id_={'value'}
                                        column='tarjeta'
                                        onChange={handleFormChange}
                                        value={formState.tarjeta} // El valor seleccionado del radio button se refleja aquí
                                    />
                                </CheckoutFormaPagoItem>
                                    <CheckoutFormaPagoItem>
                                        <p>Cuotas:</p>
                                        <Select
                                            name={'cuotas'}
                                            data={[
                                                { value: 1, label: '1 cuota (Sin interés)' }
                                            ]}
                                            id_={'value'}
                                            column='label'
                                            onChange={handleFormChange}
                                            value={formState.cuotas}
                                        />
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
                                            <span>1 cuota de ${formatPrice(totalPrice)}</span>
                                        )}
                                    </CheckoutFormaPagoItem>                
                            </CheckoutFormaPagoWrapper>
                        )}
                        {(opcionPago === 'Credito') && (
                            <CheckoutFormaPagoWrapper>
                                <CheckoutFormaPagoItem>
                                    <p>Tarjeta:</p>
                                    <Select
                                        name={'tarjeta'}
                                        data={[
                                            { value: 'visa', tarjeta: 'VISA' },
                                            { value: 'master', tarjeta: 'MASTERCARD' },
                                            { value: 'nx', tarjeta: 'NARANJA X' },
                                        ]}
                                        id_={'value'}
                                        column='tarjeta'
                                        onChange={handleFormChange}
                                        value={formState.tarjeta} // El valor seleccionado del radio button se refleja aquí
                                    />
                                </CheckoutFormaPagoItem>
                                {
                                    formState.tarjeta === "nx" 
                                    ? <>
                                        <CheckoutFormaPagoItem>
                                            <p>Cuotas:</p>
                                            <Select
                                                name={'cuotas'}
                                                data={CuotasNx}
                                                id_={'value'}
                                                column='label'
                                                onChange={handleFormChange}
                                                value={
                                                    CuotasNx.some(option => option.value == formState.cuotas)
                                                        ? formState.cuotas
                                                        : 1
                                                }
                                            />
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
                                                <span>1 cuota de ${formatPrice(totalPrice)}</span>
                                            )}
                                        </CheckoutFormaPagoItem>
                                    </>
                                    : <>
                                        <CheckoutFormaPagoItem>
                                            <p>Cuotas:</p>
                                            <Select
                                                name={'cuotas'}
                                                data={[
                                                    { value: 1, label: '1 cuota (Sin interés)' },
                                                    { value: 3, label: '3 cuotas (8% interés)' },
                                                    { value: 6, label: '6 cuotas (20% interés)' },
                                                    { value: 9, label: '9 cuotas (25% interés)' },
                                                    { value: 12, label: '12 cuotas (34% interés)' }
                                                ]}
                                                id_={'value'}
                                                column='label'
                                                onChange={handleFormChange}
                                                value={formState.cuotas}
                                            />
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
                                                <span>1 cuota de ${formatPrice(totalPrice)}</span>
                                            )}
                                        </CheckoutFormaPagoItem>
                                    </>
                                }
                                
                            </CheckoutFormaPagoWrapper>
                        )}
                        
                        <CheckoutDivider />
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
                                disabled={!cartItems.length}
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
