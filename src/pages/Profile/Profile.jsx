import React, { useEffect, useMemo, useState } from 'react'
import { ProfileContainer, ProfileMain, ProfilePasoDetalleMetodo, ProfilePasoForm, ProfilePasoInputWrapper, ProfilePasoMetodoPago, ProfilePasoMetodoPagoWrapper, ProfilePasoPagosWrapper, ProfilePasoRetiroWrapper, ProfilePasoSucursal, ProfilePasoSucursalWrapper, ProfilePasosWrapper, ProfilePasoTarjetaWrapper, ProfilePasoTitulo, ProfilePasoWrapper, ProfileWrapper } from './ProfileStyles'
import NavegacionPages from '../../components/NavegacionPages/NavegacionPages'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import InputText from '../../components/UI/InputText/InputText'
import { BsCreditCard2Back } from "react-icons/bs";
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import { CarritoPedidoDetallesWrapper, CarritoResumenButtons, CarritoResumenSubtotal, CarritoResumenTitulo, CarritoResumenTotal, CarritoResumenWrapper } from '../Carrito/CarritoStyles'
import Button from '../../components/UI/Button/Button'
import ProductCardCarrito from '../../components/ProductCardCarrito/ProductCardCarrito'
import useForm from '../../hooks/useForm'
import { CuotasNx, CuotasTarjeta, IMAGES_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useProductosConPrecio } from '../../hooks/api/useProductos'
import { FaWhatsapp } from 'react-icons/fa6'
import { finalizarPedido } from '../../utils/finalizarPedido'
import Skeleton from 'react-loading-skeleton'
import { validateEmail } from '../../utils/validarEmail'
import { clearCart } from '../../redux/cart/cartSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cart.cartItems);
    
    if (!cartItems?.length > 0) {
        navigate('/carrito')
    }

    const [formErrors, setFormErrors] = useState({});
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux
    
    
    // Manejo del form
    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: '',
        metodoPago: 'efectivo / transferencia',
        tarjeta: '',
        cuotas: ''
    });

    

    const validarCampos = () => {
        const errores = {};
    
        if (!formState.nombre.trim()) errores.nombre = 'Este campo es obligatorio';
        if (!formState.apellido.trim()) errores.apellido = 'Este campo es obligatorio';

        
        if (!user) {
            if (!formState.dni.trim()) errores.dni = 'Este campo es obligatorio';
        }

        // Validar Email
        if (!formState.email.trim()) {
            errores.email = 'Este campo es obligatorio';
        } else if (!validateEmail(formState.email)) {
            errores.email = 'Email inválido';
        }

        if (!formState.metodoPago.trim()) errores.metodoPago = 'Este campo es obligatorio';
        if (formState.metodoPago === 'debito' || formState.metodoPago === 'credito') {
            if (!formState.tarjeta.trim()) errores.tarjeta = 'Este campo es obligatorio';
        }
    
        if (formState.metodoPago === 'credito') {
            if (!formState.cuotas) errores.cuotas = 'Este campo es obligatorio';
        }
    
        setFormErrors(errores);
    
        return Object.keys(errores).length === 0;
    };

    const handleFinalizarPedido = () => {
        if (validarCampos()) {
            // Continuar con el proceso (WhatsApp, etc.)
            finalizarPedido(formState, productosCarrito, precioTotal, totalConInteres, cuotas, user, tieneFate, tienePirelli); 
            navigate('/cuenta')
            dispatch(clearCart())
        } else {
            console.log('Formulario con errores');
        }
    };
    
    

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
    

    // Tarjetas
    const handleMetodoPago = (metodo) => {
        setFormState(prev => ({
            ...prev,
            metodoPago: metodo,
            cuotas: '' // resetea solo cuotas
        }));
    };
    
    
    const tarjetasOpciones = [
        { name: 'Visa', code: 'Visa' },
        { name: 'Mastercard', code: 'Mastercard' },
        { name: 'Naranja X', code: 'Naranja X' }
    ]; 

    const [cuotasDisponibles, setCuotasDisponibles] = useState([]);

    
    // Manejar cambio de tarjeta
    const handleTarjetaChange = (tarjetaObj) => {
        setFormState(prev => ({
            ...prev,
            tarjeta: tarjetaObj,
            cuotas: ''
        }));
    
        setCuotasDisponibles(tarjetaObj === 'Naranja X' ? CuotasNx : CuotasTarjeta);
    };
    

    // Manejar cambio de cuotas
    const handleCuotasChange = (e) => {
        const cuotaSeleccionada = e.target?.value || e;
        setFormState(prev => ({
            ...prev,
            cuotas: cuotaSeleccionada
        }));
    };

    // Calcular el cargo a realizar
    const calcularCargo = (precioTotal, cuotasSeleccionadas) => {
        const cuotaSeleccionada = cuotasSeleccionadas.find(cuota => cuota.value === formState.cuotas);
        if (cuotaSeleccionada) {
            const interes = cuotaSeleccionada.interes || 0;
            const cuotaConInteres = (precioTotal * (1 + interes)) / formState.cuotas; // Calcula cada cuota con el interés
            const totalConInteres = cuotaConInteres * formState.cuotas; // Calcula el total con el interés
            return {
                cuotaConInteres, // Este es el valor de cada cuota con interés
                totalConInteres  // Este es el total con el interés
            };
        }
        return { cuotaConInteres: precioTotal / formState.cuotas, totalConInteres: precioTotal };
    };
    
    // Llamar la función de calcular cargo
    const { cuotaConInteres, totalConInteres } = calcularCargo(precioTotal, cuotasDisponibles);
    
    // Calcular cuotas
    const cuotas = cuotasDisponibles.find(cuota => cuota.value === formState.cuotas);


    
    const tieneFate = productosCarrito?.some(producto => producto.marca === "FATE");
    const tienePirelli = productosCarrito?.some(producto => producto.marca === "PIRELLI");

    useEffect(() => {
        if (user) {
            setFormState(prev => ({
                ...prev,
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                email: user.email || '',
                metodoPago: 'cuenta corriente'
            }));
        }
    }, [user]);
    
    
    return (
        <ProfileContainer>
            <ProfileWrapper>
                <NavegacionPages>
                    <NavLink to={'/'}>Inicio</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={'/carrito'}>Carrito</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={'/profile'}>Finalizar pedido</NavLink>
                </NavegacionPages>
                <ProfileMain>
                    <ProfilePasosWrapper>
                        <ProfilePasoWrapper>
                            <ProfilePasoTitulo>
                                <h2>1. Identificacion</h2>
                                <p>Solicitamos únicamente la información esencial para la finalización del pedido.</p>
                            </ProfilePasoTitulo>
                            <ProfilePasoForm>
                                <ProfilePasoInputWrapper>
                                    <p>Nombre: *</p>
                                    <InputText 
                                        name="nombre"
                                        value={formState.nombre}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su nombre"
                                        error={formErrors.nombre}
                                        disabled={user}
                                    />
                                </ProfilePasoInputWrapper>
                                <ProfilePasoInputWrapper>
                                    <p>Apellido: *</p>
                                    <InputText 
                                        name="apellido"
                                        value={formState.apellido}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su apellido"
                                        error={formErrors.apellido}
                                        disabled={user}
                                    />
                                </ProfilePasoInputWrapper>
                                <ProfilePasoInputWrapper>
                                    <p>DNI: *</p>
                                    <InputText 
                                        name="apellido"
                                        value={formState.apellido}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su apellido"
                                        error={formErrors.apellido}
                                        disabled={user}
                                        keyfilter="int"
                                    />
                                </ProfilePasoInputWrapper>
                                <ProfilePasoInputWrapper>
                                    <p>Email: *</p>
                                    <InputText 
                                        name="email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su email"
                                        error={formErrors.email}
                                        disabled={user}
                                        keyfilter="email"
                                    />
                                </ProfilePasoInputWrapper>
                                
                                {
                                    user ? <ProfilePasoInputWrapper>
                                    <p>Email: *</p>
                                    <InputText 
                                        name="email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su email"
                                        error={formErrors.email}
                                        type="email"
                                        disabled={user}
                                    />
                                </ProfilePasoInputWrapper> : <ProfilePasoInputWrapper>
                                    <p>DNI: *</p>
                                    <InputText 
                                        name="dni"
                                        value={formState.dni}
                                        onChange={handleFormChange}
                                        placeholder="Escriba su DNI"
                                        error={formErrors.dni}
                                    />
                                </ProfilePasoInputWrapper>
                                }
                                
                            </ProfilePasoForm>
                        </ProfilePasoWrapper>
                        <ProfilePasoWrapper>
                            <ProfilePasoTitulo>
                                <h2>2. Pago</h2>
                                <p>Seleccioná tu metodo de pago.</p>
                            </ProfilePasoTitulo>
                            <ProfilePasoPagosWrapper>
                                <ProfilePasoMetodoPagoWrapper>
                                    {
                                        user ? 
                                        <>
                                        <ProfilePasoMetodoPago 
                                            className={formState.metodoPago === 'cuenta corriente' ? 'active' : ''}
                                            onClick={() => handleMetodoPago('cuenta corriente')}
                                        >
                                            <p>Cuenta corriente</p>
                                        </ProfilePasoMetodoPago>
                                        <ProfilePasoMetodoPago 
                                            className={formState.metodoPago === 'efectivo / transferencia' ? 'active' : ''}
                                            onClick={() => handleMetodoPago('efectivo / transferencia')}
                                        >
                                            <p>Efectivo / Transferencia</p>
                                        </ProfilePasoMetodoPago>
                                        </>
                                        :
                                        <>
                                        <ProfilePasoMetodoPago 
                                            className={formState.metodoPago === 'efectivo / transferencia' ? 'active' : ''}
                                            onClick={() => handleMetodoPago('efectivo / transferencia')}
                                        >
                                            <p>Efectivo / Transferencia</p>
                                        </ProfilePasoMetodoPago>
                                        <ProfilePasoMetodoPago 
                                            className={formState.metodoPago === 'debito' ? 'active' : ''}
                                            onClick={() => handleMetodoPago('debito')}
                                        >
                                            <p>Tarjeta de débito</p>
                                            <BsCreditCard2Back />
                                        </ProfilePasoMetodoPago>
                                        <ProfilePasoMetodoPago 
                                            className={formState.metodoPago === 'credito' ? 'active' : ''}
                                            onClick={() => handleMetodoPago('credito')}
                                        >
                                            <p>Tarjeta de crédito</p>
                                            <BsCreditCard2Back />
                                        </ProfilePasoMetodoPago>
                                        </>
                                    }
                                    
                                    
                                </ProfilePasoMetodoPagoWrapper>
                                <ProfilePasoDetalleMetodo>
                                    {(formState.metodoPago === 'debito' || formState.metodoPago === 'credito') ? (
                                    <>
                                        <ProfilePasoTarjetaWrapper>
                                            <p>Tarjeta:</p>
                                            <Dropdown
                                                value={formState.tarjeta}
                                                onChange={(e) => handleTarjetaChange(e.value)} // el value ya es el objeto
                                                options={tarjetasOpciones}
                                                optionLabel="name"
                                                optionValue="code"
                                                placeholder="Seleccione tarjeta"
                                                error={formErrors.tarjeta}
                                            />
                                        </ProfilePasoTarjetaWrapper>
                                        {
                                            formState.metodoPago === 'credito' && <ProfilePasoTarjetaWrapper>
                                            <p>Cuotas:</p>
                                            <Dropdown
                                                value={formState.cuotas}
                                                onChange={(e) => handleCuotasChange(e.value)} // el value ya es el objeto
                                                options={cuotasDisponibles}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Seleccione cuotas"
                                                disabled={!formState.tarjeta}
                                                error={formErrors.cuotas}
                                            />
                                        </ProfilePasoTarjetaWrapper>
                                        }
                                        
                                        {
                                            formState.cuotas && formState.cuotas > 1 && formState.cuotas !== "z" && <>
                                                <ProfilePasoTarjetaWrapper>
                                                    <p>{formState.cuotas} cuotas ({cuotasDisponibles.find(c => c.value === formState.cuotas)?.interes * 100}% interés) de:</p>
                                                    <span>{cuotaConInteres.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                                                </ProfilePasoTarjetaWrapper>
                                                <ProfilePasoTarjetaWrapper>
                                                    <p>Total con interés:</p>
                                                    <span>{totalConInteres.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                                                </ProfilePasoTarjetaWrapper>
                                            </>
                                        }
                                    </>
                                ): (<p>Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago.</p>)}
                                </ProfilePasoDetalleMetodo>
                            </ProfilePasoPagosWrapper>
                        </ProfilePasoWrapper>
                        {
                            !user && <ProfilePasoWrapper>
                            <ProfilePasoTitulo>
                                <h2>Retiro del pedido</h2>
                                <p>Solicitamos únicamente la información esencial para la finalización del pedido.</p>
                            </ProfilePasoTitulo>
                            <ProfilePasoRetiroWrapper>
                                {
                                    tieneFate && <ProfilePasoSucursalWrapper>
                                        <img src={`${IMAGES_URL}/marcas/fate.png`} className='marca'/>
                                        <ProfilePasoSucursal>
                                            Av. Emilio Caraffa 2795 (CM Neumáticos)
                                        </ProfilePasoSucursal>
                                    </ProfilePasoSucursalWrapper>
                                }

{
                                    tienePirelli && <ProfilePasoSucursalWrapper>
                                        <img src={`${IMAGES_URL}/marcas/pirelli.png`} className='marca'/>
                                        <ProfilePasoSucursal>
                                            Av. Japon 1490 (XL NEUMATICOS)
                                        </ProfilePasoSucursal>
                                    </ProfilePasoSucursalWrapper>
                                }
                                
                                
                            </ProfilePasoRetiroWrapper>
                            
                        </ProfilePasoWrapper>
                        }
                        
                    </ProfilePasosWrapper>
                    <CarritoPedidoDetallesWrapper>
                        <CarritoResumenWrapper>
                            <CarritoResumenTitulo>
                                Resumen del pedido
                            </CarritoResumenTitulo>
                                {
                                    productosCarrito?.map((item, index) => {
                                        return <ProductCardCarrito key={`${item.id_producto}-${index}`} {...item} isLoading={isLoading} profile/>;
                                    })
                                }
                            <CarritoResumenSubtotal>
                                <p>Subtotal:</p>
                                {
                                    !isLoading ?  <p>{precioTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p> : <p><Skeleton width={100}/></p>
                                }
                            </CarritoResumenSubtotal>
                            <CarritoResumenTotal>
                                <p>Total:</p>
                                {
                                    !isLoading ?  <p>{precioTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p> : <p><Skeleton width={130}/></p>
                                }
                            </CarritoResumenTotal>
                            {
                                formState.cuotas > 1 && <CarritoResumenTotal>
                                    <p>Total con interes:</p>
                                    {
                                        !isLoading ?  <p>{totalConInteres.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p> : <p><Skeleton width={130}/></p>
                                    }
                                </CarritoResumenTotal>
                            }
                            
                            <CarritoResumenButtons>
                                <Button onClick={handleFinalizarPedido}>Finalizar pedido <FaWhatsapp/></Button>
                                <NavLink to={'/carrito'}><LiaAngleLeftSolid />Volver al carrito</NavLink>
                            </CarritoResumenButtons>
                        </CarritoResumenWrapper>
                    </CarritoPedidoDetallesWrapper>
                    
                </ProfileMain>
            </ProfileWrapper>
        </ProfileContainer>
    )
}

export default Profile