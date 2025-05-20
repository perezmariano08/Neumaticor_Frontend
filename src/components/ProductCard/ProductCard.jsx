import { ProductButtonAgregarCantidad, ProductButtonAgregarWrapper, ProductButtons, ProductCardInfo, ProductCardPrecio, ProductCardWrapper, ProductImg, ProductTitle } from './ProductCardStyles'
import Button from '../UI/Button/Button'
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart} from '../../redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { IMAGES_URL } from '../../utils/constants';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaEye } from 'react-icons/fa6';

const ProductCard = ({producto}) => {   
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast(); // Usamos el hook para acceder al Toast
    const [ quantity, setQuantity ] = useState(1)

    // Simular carga del carrito
    const [loading, setLoading] = useState(false); 

    const añadirProducto = () => {
        setLoading(true); // Activar loader
        // Armamos el objeto con los campos deseados
        const itemCart = {
            id_producto: producto.id_producto,
        };

        // Simula un proceso asíncrono
        setTimeout(() => {
            dispatch(addToCart({product: itemCart, quantity: quantity}))
            toast.current.show({
                severity: 'success',
                summary: 'Producto agregado',
                detail: `${producto.descripcion} agregado al carrito`,
                life: 3000,
            });
            setQuantity(1)
            setLoading(false); // Desactivar loader
        }, 1000); // Simula un retraso de 2 segundos
    };    

    return (
        <ProductCardWrapper>
            <ProductImg 
                // onClick={() => navigate(`/productos/${producto.id_producto}`)}
                title={producto.descripcion}
                className={producto.stock === "N" && 'out'}>
                <img alt={producto.img} src={producto.img ? `${IMAGES_URL}/productos/${producto.marca.toLowerCase().replace(/\s+/g, '-')}/${producto.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                {
                    producto.oferta === "S" && <div className="oferta">¡oferta!</div>
                }
                {
                    producto.stock === "N" && <div className="out">SIN STOCK</div>
                }
                <img src={producto.img && `${IMAGES_URL}/marcas/${producto.marca.toLowerCase().replace(/\s+/g, '-')}.webp`} className='marca'/>
            </ProductImg>
            <ProductCardInfo>
                <ProductTitle>
                    <span>{producto.marca} / {producto.vehiculo}</span>
                    <h2>{producto.descripcion}</h2>
                </ProductTitle>
                <ProductCardPrecio>
                    {
                        producto.oferta === "S" ? (
                            <>
                                <p className='price'>{`$ ${formatPrice(user ? producto.precio_oferta : producto.precio_oferta)}`}</p>
                                <p className='price-off'>{`$ ${formatPrice(user ? producto.precio : producto.precio)}`}</p>
                            </>
                        ) : (
                            <>
                                <p className='price'>{`$ ${formatPrice(user ? producto.precio : producto.precio)}`}</p>
                            </>
                        )
                    }
                </ProductCardPrecio>
                
                {
                    producto.stock === "S" ? (<ProductButtons>
                    {/* <Button width='100%' background="black" color='white-0' onClick={() => navigate(`/productos/${producto.id_producto}`)}>
                        <FaEye />
                        <span>ver</span>
                    </Button>  */}
                    <ProductButtonAgregarWrapper>
                        <ProductButtonAgregarCantidad>
                            <span
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            >
                                -
                            </span>
                            <p>{quantity}</p>
                            <span
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                +
                            </span>
                        </ProductButtonAgregarCantidad>
                        <Button width='100%' onClick={añadirProducto} disabled={loading}>
                            {loading ? (
                                <>
                                    <ProgressSpinner 
                                        style={{width: '16px', height: '16px'}} 
                                        strokeWidth="2" 
                                        fill="transparent" 
                                        animationDuration=".5s" 
                                    />
                                    <span>agregando...</span>
                                </>
                            ) : (
                                <>
                                    <HiOutlineShoppingCart />
                                    <span>agregar</span>
                                </>
                            )}
                        </Button>
                    </ProductButtonAgregarWrapper>
                </ProductButtons>) : <Button background='black-900' color='white-100' width='100%'>
                            Sin Stock
                        </Button>
                }
                
            </ProductCardInfo>
        </ProductCardWrapper>
    )
}

export default ProductCard