import React, { useState } from 'react';

const Payment = () => {
    const [amount, setAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    // Cargar el SDK de Mercado Pago
    React.useEffect(() => {
        const mp = new window.MercadoPago('YOUR_PUBLIC_KEY', {
            locale: 'es-AR',
        });

        // Crear el formulario de pago
        mp.checkout({
            preference: {
                id: 'your_preference_id_here', // Esto lo generas en el backend
            },
            render: {
                container: '#button-checkout',
                label: 'Pagar',
            },
        });
    }, []);

    const handlePayment = async () => {
        const data = {
            amount,
            token,
            description: 'Producto',
            installments: 1,
            paymentMethodId: paymentMethod,
            email,
        };

        // Enviar el pago al backend para su procesamiento
        await fetch('http://localhost:3001/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al procesar el pago:', error);
        });
    };

    return (
        <div>
            <h2>Realizar pago</h2>
            <form onSubmit={handlePayment}>
                <div>
                    <label htmlFor="amount">Monto:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div id="button-checkout"></div>
            </form>
        </div>
    );
};

export default Payment;
