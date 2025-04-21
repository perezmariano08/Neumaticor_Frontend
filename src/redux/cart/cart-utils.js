export const addItemToCart = (cartItems, product, quantityToAdd = 1) => {
    const productInCart = cartItems.find(item => item.id_producto === product.id_producto);

    if (productInCart) {
        return cartItems.map(item =>
            item.id_producto === product.id_producto
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item
        );
    } else {
        return [
            ...cartItems,
            {
                ...product,
                quantity: quantityToAdd,
            },
        ];
    }
};


export const removeItemFromCart = (cartItems, id_producto) => {
    const productToRemove = cartItems.find((item) => item.id_producto === id_producto);
    if (productToRemove.quantity > 1) {
        return cartItems.map((item) => {
            return item.id_producto === productToRemove.id_producto
            ? {
                ...item,
                quantity: item.quantity - 1
            }
            : item
        })
    } else {
        
            return cartItems.filter((item) => item.id_producto !== productToRemove.id_producto)
        
    }
}

export const resetShippingCost = (cartItems, shippingCost) => {

    if(cartItems.length === 1 && cartItems[0].quantity === 1) {
        return 0
    } else {
        return shippingCost
    }

}