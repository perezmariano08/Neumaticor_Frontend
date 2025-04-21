import React from 'react'
import { FaTrashCan } from 'react-icons/fa6'
import { formatPrice } from '../../utils/formatPrice'
import { addToCart, removeFromCart, removeItem } from '../../redux/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGES_URL } from '../../utils/constants'
import { ItemHandler, ItemInfo, ItemText, ItemTitle, CheckoutItemWrapper } from './CheckoutStyles'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton';

const ImageSkeletonWrapper = styled.div`
    height: 100%;
    aspect-ratio: 1 / 1; // cuadrado
    border-radius: 20px;
    overflow: hidden;
`;

const CheckoutItem = ({isLoading, id_producto, quantity, descripcion, marca, vehiculo, img, precio }) => {    
    const dispatch = useDispatch()    
    
    const enabledControl = quantity > 1 

    if (isLoading) {
        return (
            <Skeleton width='100%' height={150} borderRadius={20} />
        )
    }

    return (
        <CheckoutItemWrapper>
                <img alt={img} src={img ? `${IMAGES_URL}/productos/${marca.toLowerCase()}/${vehiculo.toLowerCase()}/${img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                <ItemInfo>
                <ItemText>
                    <ItemTitle>
                        <span>{marca} / {vehiculo}</span>
                        <h3>{descripcion}</h3>
                    </ItemTitle>
                    
                    <h4>${formatPrice(precio)}</h4>
                    <ItemHandler>
                        {!enabledControl 
                        ? 
                            <span className="quantity-handler down disabled">-</span> 
                        :
                            <span className="quantity-handler down" onClick={() => dispatch(removeFromCart(id_producto))}>-</span>}
                        <span className="item-quantity">{quantity}</span>
                        <span className="quantity-handler up" onClick={() => dispatch(addToCart({product:{quantity, id_producto}}))}>+</span>
                        <FaTrashCan className="item-trash" onClick={() => dispatch(removeItem(id_producto))} />
                    </ItemHandler>
                </ItemText>
            </ItemInfo>
        </CheckoutItemWrapper>
    )
}

export default CheckoutItem