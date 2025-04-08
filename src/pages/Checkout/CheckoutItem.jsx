import React from 'react'
import { FaTrashCan } from 'react-icons/fa6'
import { formatPrice } from '../../utils/formatPrice'
import { addToCart, removeFromCart, removeItem } from '../../redux/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGES_URL } from '../../utils/constants'
import { ItemHandler, ItemInfo, ItemText, ItemTitle, CheckoutItemWrapper } from './CheckoutStyles'

const CheckoutItem = ({id_producto, producto, vehiculo, precio, marca, precio_cuenta, src, quantity, descripcion, rubro, alto, rodado}) => {    
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const dispatch = useDispatch()
    const enabledControl = quantity > 1 

    return (
        <CheckoutItemWrapper>
                <img src={`${IMAGES_URL}/productos/automovil/prestiva.png`}/>
                <ItemInfo>
                <ItemText>
                    <ItemTitle>
                        <span>{marca} / {vehiculo}</span>
                        <h3>{descripcion}</h3>
                    </ItemTitle>
                    
                    <h4>${formatPrice(user ? precio_cuenta : precio)}</h4>
                    <ItemHandler>
                        {!enabledControl 
                        ? 
                            <span className="quantity-handler down disabled">-</span> 
                        :
                            <span className="quantity-handler down" onClick={() => dispatch(removeFromCart(id_producto))}>-</span>}
                        <span className="item-quantity">{quantity}</span>
                        <span className="quantity-handler up" onClick={() => dispatch(addToCart({src, producto, precio, quantity, id_producto}))}>+</span>
                        <FaTrashCan className="item-trash" onClick={() => dispatch(removeItem(id_producto))} />
                    </ItemHandler>
                </ItemText>
            </ItemInfo>
        </CheckoutItemWrapper>
    )
}

export default CheckoutItem