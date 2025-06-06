import { createSlice } from "@reduxjs/toolkit"
import { addItemToCart, removeItemFromCart, resetShippingCost } from "./cart-utils"
import { SHIPPING_COST } from "../../utils/constants"

const INITIAL_STATE = {
    cartItems: [],
    shippingCost: 0,
    hidden: true,
    showModal:false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        //Agregar al carrito
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
        
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, product, quantity),
                shippingCost: SHIPPING_COST,
            };
        },
        //Remover del carrito
        removeFromCart: (state, action) => {            
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload),
                shippingCost: resetShippingCost(state.cartItems, SHIPPING_COST)
            }
        },
        //Limpiar todo el  carrito
        clearCart: (state) => {
            return {
                ...state,
                cartItems: [],
                shippingCost: 0
            }
        },
        //Toggle de apertura/cierre de carrito
        toggleHiddenCart: (state) => {
            return {
                ...state,
                hidden: !state.hidden
            }
        },
        // Eliminar un artículo específico del carrito
        removeItem: (state, action) => {
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id_producto !== action.payload),
                shippingCost: resetShippingCost(state.cartItems, SHIPPING_COST)
            }
        },
        // Nueva acción para controlar el estado del modal
        setShowModal: (state, action) => {
            return {
                ...state,
                showModal: action.payload,
            };
        },
    }
})

export const {
    addToCart,
    clearCart,
    removeFromCart,
    toggleHiddenCart,
    removeItem,
    setShowModal
} = cartSlice.actions;

export default cartSlice.reducer;