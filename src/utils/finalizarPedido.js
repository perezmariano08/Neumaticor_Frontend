import axios from "axios";
import { URL_API } from "./constants";

export const finalizarPedido = async (formState, productosCarrito, precioTotal, totalConInteres, cuotas, user, tieneFate, tienePirelli) => {
    const mensaje = generarMensajeWhatsapp(formState, productosCarrito, precioTotal, totalConInteres, cuotas, user, tieneFate, tienePirelli);
    console.log(user);
    console.log(formState);
    console.log(productosCarrito);

    try {
        const response = await axios.post(`${URL_API}pedidos/finalizar-pedido`, {
            id_usuario: user.id_usuario,
            total: precioTotal,
            metodo_pago: formState.metodoPago,
            productos: productosCarrito
        });

        const { success, message } = response.data;

        if (success) {
            alert("pedido existoso")
        } else {
            alert(`Error: ${message}`);
        }

    } catch (error) {
        console.error('Error en el catch:', error);
    } finally {
    }
    const telefonoNegocio = '5493517649357'; // Reemplazar con el número del negocio
    const url = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
    return
    window.open(url, '_blank');
};

const generarMensajeWhatsapp = (formState, productosCarrito, precioTotal, totalConInteres, cuotas, user,tieneFate, tienePirelli) => {
    let mensaje = `*Nuevo pedido desde la web*\n\n`;

    mensaje += `*Cliente:*\n`;
    mensaje += `- Nombre: ${formState.nombre} ${formState.apellido}\n`;
    if (user) {
        mensaje += `- Email: ${formState.email}\n\n`;
    } else {
        mensaje += `- DNI: ${formState.dni}\n\n`;
    }
    
    if (tieneFate) {
        mensaje += `*Retirar productos FATE por: Av. Emilio Caraffa 2795 (CM Neumáticos)*\n\n`;
    }

    if (tienePirelli) {
        mensaje += `*Retirar productos PIRELLI por: Av. Japon 1490 (XL NEUMATICOS)*\n\n`;
    }
    


    mensaje += `*Método de pago: ${formState.metodoPago.toUpperCase()}*\n`;
    if (formState.metodoPago === 'credito' || formState.metodoPago === 'debito') {
        mensaje += `- Tarjeta: ${formState.tarjeta}\n`;
    }
    if (formState.metodoPago === 'credito' && cuotas ) {
        mensaje += `- Cuotas: ${cuotas.label}\n`;
        if (formState.cuotas !== "z") {
            mensaje += `- Total con interés: ${totalConInteres.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}\n`;
        }
    }

    mensaje += `\n*Productos:*\n`;
    productosCarrito.forEach(item => {
        mensaje += `- ${item.descripcion} x${item.quantity} - ${item.subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}\n`;
    });

    mensaje += `\n*Total: ${formState.cuotas > 1 ? totalConInteres : precioTotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}*`;

    return mensaje;
};
