import React from 'react'
import { ProductCardButtons, ProductCardCantidad, ProductCardCarritoDescripcion, ProductCardCarritoDetalles, ProductCardCarritoMain, ProductCardCarritoPrecio, ProductCardCarritoWrapper } from './ProductCardCarritoStyles'
import { BsTrash3 } from "react-icons/bs";
import { IMAGES_URL } from '../../utils/constants';
import {formatPrice} from '../../utils/formatPrice'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, removeItem } from '../../redux/cart/cartSlice';
import Skeleton from 'react-loading-skeleton';
import { confirmDialog } from 'primereact/confirmdialog';

const ProductCardCarrito = ({stock, isLoading, profile, id_producto, oferta, precio_oferta, descripcion, marca, vehiculo, precio, quantity, img}) => {
    const dispatch = useDispatch()

    const confirmar = () => {
        confirmDialog({
            message: `¿Estás seguro de que quieres eliminar ${descripcion} del carrito?`,
            header: 'Confirmación',
            accept: () => dispatch(removeItem(id_producto))
        });
    };

    // Skeleton
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
        <ProductCardCarritoWrapper className={`${profile ? 'profile' : ''} ${stock === "N" ? 'off' : ''}`.trim()}>
            <ProductCardCarritoMain>
                <img alt={img} src={img ? `${IMAGES_URL}/productos/${marca.toLowerCase().replace(/\s+/g, '-')}/${img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                <ProductCardCarritoDetalles>
                    <ProductCardCarritoDescripcion>
                        <span>{marca} / {vehiculo}</span>
                        <h3>{descripcion}</h3>
                        {stock === "N" && <strong>SIN STOCK</strong>}
                    </ProductCardCarritoDescripcion>
                    <ProductCardCarritoPrecio>
                        {
                            oferta === "S" ? (
                                <>
                                    <p>{profile && `${quantity}x `}$ {formatPrice(precio_oferta)}</p>
                                    <p className='price-off'>$ {formatPrice(precio)}</p>
                                </>
                            ) : (
                                <p>{profile && `${quantity}x `}$ {formatPrice(precio)}</p>
                            )
                        }
                    </ProductCardCarritoPrecio>
                </ProductCardCarritoDetalles>
            </ProductCardCarritoMain>
            {
                !profile && <ProductCardButtons>
                    {
                        stock === "S" && <ProductCardCantidad>
                            <span 
                                onClick={() => quantity > 1 && dispatch(removeFromCart(id_producto))} 
                                style={{ opacity: quantity > 1 ? 1 : 0.3, cursor: quantity > 1 ? 'pointer' : 'not-allowed' }}
                            >-</span>
                            <p>{quantity}</p>
                            <span  onClick={() => dispatch(addToCart({product:{quantity, id_producto}}))}>+</span>
                        </ProductCardCantidad>
                    }
                <BsTrash3 onClick={confirmar} />
            </ProductCardButtons>
            }
        </ProductCardCarritoWrapper>
    )
}

export default ProductCardCarrito