import { ProductButtons, ProductCardInfo, ProductCardWrapper, ProductImg, ProductTitle } from './ProductCardStyles'
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
            dispatch(addToCart({product: itemCart}));
            toast.current.show({
                severity: 'success',
                summary: 'Producto agregado',
                detail: `${producto.descripcion} agregado al carrito`,
                life: 3000,
            });
            setLoading(false); // Desactivar loader
        }, 1000); // Simula un retraso de 2 segundos
    };

    return (
        <ProductCardWrapper>
            <ProductImg 
                // onClick={() => navigate(`/productos/${producto.id_producto}`)}
                title={producto.descripcion}>
                <img alt={producto.img} src={producto.img ? `${IMAGES_URL}/productos/${producto.marca.toLowerCase().replace(/\s+/g, '-')}/${producto.img.toLowerCase()}` : `${IMAGES_URL}/images/imagen-no-disponible.png`} className='producto'/>
                <img src={producto.img && `${IMAGES_URL}/marcas/${producto.marca.toLowerCase().replace(/\s+/g, '-')}.png`} className='marca'/>
            </ProductImg>
            <ProductCardInfo>
                <ProductTitle>
                    <span>{producto.marca} / {producto.vehiculo}</span>
                    <h2>{producto.descripcion}</h2>
                </ProductTitle>
                <p className='price'>{`$ ${formatPrice(user ? producto.precio : producto.precio)}`}</p>
                <ProductButtons>
                    {/* <Button width='100%' background="black" color='white-0' onClick={() => navigate(`/productos/${producto.id_producto}`)}>
                        <FaEye />
                        <span>ver</span>
                    </Button>  */}
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
                </ProductButtons>
            </ProductCardInfo>
        </ProductCardWrapper>
    )
}

export default ProductCard