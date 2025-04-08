import React from 'react'
import { ItemHandler, ItemInfo, ItemText, ItemTitle, ModalCartItemWrapper } from './ModalCartStyles'
import { FaTrashCan } from 'react-icons/fa6'
import { formatPrice } from '../../utils/formatPrice'
import { addToCart, removeFromCart, removeItem } from '../../redux/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { IMAGES_URL } from '../../utils/constants'

const ModalCartItem = ({id_producto, producto, precio, marca, precio_cuenta, src, quantity, rubro, alto, rodado}) => {
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const dispatch = useDispatch()
    const enabledControl = quantity > 1 

    console.log(precio_cuenta);
    
    return (
        <ModalCartItemWrapper>
                <img src={`${IMAGES_URL}/productos/${src}`}/>
                <ItemInfo>
                <ItemText>
                    <ItemTitle>
                        <span>{rubro}</span>
                        <h3>{producto}</h3>
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
        </ModalCartItemWrapper>
    )
}

export default ModalCartItem