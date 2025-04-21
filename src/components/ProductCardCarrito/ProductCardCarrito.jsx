import React from 'react'
import { ProductCardButtons, ProductCardCantidad, ProductCardCarritoDescripcion, ProductCardCarritoDetalles, ProductCardCarritoMain, ProductCardCarritoPrecio, ProductCardCarritoWrapper } from './ProductCardCarritoStyles'
import { BsTrash3 } from "react-icons/bs";
import { IMAGES_URL } from '../../utils/constants';
import {formatPrice} from '../../utils/formatPrice'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeItem } from '../../redux/cart/cartSlice';
import Skeleton from 'react-loading-skeleton';

const ProductCardCarrito = ({isLoading, profile, id_producto, descripcion, marca, vehiculo, precio, quantity, img}) => {
    const dispatch = useDispatch()
    if (isLoading) {
        return (
            <ProductCardCarritoWrapper profile={profile}>
                <ProductCardCarritoMain>
                    <Skeleton width={70} height={70} borderRadius={10} />
                    <ProductCardCarritoDetalles>
                        <ProductCardCarritoDescripcion>
                            <span><Skeleton width={70}  height={12}/></span>
                            <h3><Skeleton width={200} height={16} /></h3>
                        </ProductCardCarritoDescripcion>
                        <ProductCardCarritoPrecio>
                            <Skeleton width={100} height={18} />
                        </ProductCardCarritoPrecio>
                    </ProductCardCarritoDetalles>
                </ProductCardCarritoMain>
                {
                    !profile && <ProductCardButtons>
                    <ProductCardCantidad>
                        <span 
                            onClick={() => quantity > 1 && dispatch(removeFromCart(id_producto))} 
                            style={{ opacity: quantity > 1 ? 1 : 0.3, cursor: quantity > 1 ? 'pointer' : 'not-allowed' }}
                        >-</span>
                        <p><Skeleton width={32} height={18} /></p>
                        <span  onClick={() => dispatch(addToCart({product:{quantity, id_producto}}))}>+</span>
                    </ProductCardCantidad>
                    <BsTrash3  onClick={() => dispatch(removeItem(id_producto))} />
                </ProductCardButtons>
                }
                
            </ProductCardCarritoWrapper>  
        )
    }

    return (
        <ProductCardCarritoWrapper profile={profile}>
            <ProductCardCarritoMain>
                <img alt={img} src={img ? `${IMAGES_URL}/productos/${marca.toLowerCase()}/${vehiculo.toLowerCase()}/${img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                <ProductCardCarritoDetalles>
                    <ProductCardCarritoDescripcion>
                        <span>{marca} / {vehiculo}</span>
                        <h3>{descripcion}</h3>
                    </ProductCardCarritoDescripcion>
                    <ProductCardCarritoPrecio>
                        {profile && `${quantity}x `}
                        $ {formatPrice(precio)}
                    </ProductCardCarritoPrecio>
                </ProductCardCarritoDetalles>
            </ProductCardCarritoMain>
            {
                !profile && <ProductCardButtons>
                <ProductCardCantidad>
                    <span 
                        onClick={() => quantity > 1 && dispatch(removeFromCart(id_producto))} 
                        style={{ opacity: quantity > 1 ? 1 : 0.3, cursor: quantity > 1 ? 'pointer' : 'not-allowed' }}
                    >-</span>
                    <p>{quantity}</p>
                    <span  onClick={() => dispatch(addToCart({product:{quantity, id_producto}}))}>+</span>
                </ProductCardCantidad>
                <BsTrash3  onClick={() => dispatch(removeItem(id_producto))} />
            </ProductCardButtons>
            }
        </ProductCardCarritoWrapper>
    )
}

export default ProductCardCarrito