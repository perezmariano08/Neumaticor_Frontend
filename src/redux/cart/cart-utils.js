export const addItemToCart = (cartItems, product, toast) => {
    const productInCart = cartItems.find((item) => {
        return item.id_producto === product.id_producto
    })

    if(productInCart) {
        return cartItems.map((item) => {
            return item.id_producto === productInCart.id_producto
            ? {
                ...item,
                quantity: item.quantity + 1
            }
            : item
        })
    } else {
        return [
            ...cartItems,
            {
                ...product,
                quantity: 1
            }
        ]
    }
}

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