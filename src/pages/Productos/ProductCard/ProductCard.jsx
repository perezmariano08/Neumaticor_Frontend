import { ProductButtons, ProductCardInfo, ProductCardWrapper, ProductImg, ProductTitle } from './ProductCardStyles'
import Button from '../../../components/UI/Button/Button'
import { formatPrice } from '../../../utils/formatPrice';
import { useDispatch, useSelector} from 'react-redux';
import { addToCart} from '../../../redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { IMAGES_URL } from '../../../utils/constants';
import { HiOutlineShoppingCart } from "react-icons/hi2";

const ProductCard = ({producto}) => {   
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast(); // Usamos el hook para acceder al Toast

    // Simular carga del carrito
    const [loading, setLoading] = useState(false); 

    const añadirProducto = () => {
        setLoading(true); // Activar loader
        // Simula un proceso asíncrono
        setTimeout(() => {
            dispatch(addToCart(producto));
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
            <ProductImg onClick={() => navigate(`/productos/${producto.id_producto}`)}>
                <img src={`${IMAGES_URL}/productos/automovil/prestiva.png`} className='producto'/>
                <img src={`${IMAGES_URL}/marcas/${producto.marca.toLowerCase()}.png`} className='marca'/>
            </ProductImg>
            <ProductCardInfo>
                <ProductTitle>
                    <span>{producto.marca} / {producto.vehiculo}</span>
                    <h3>{producto.descripcion}</h3>
                </ProductTitle>
                <h4>{`$ ${formatPrice(user ? producto.precio_cuenta : producto.precio)}`}</h4>
                <ProductButtons>
                    {/* <Button width='100%' background="black" color='yellow' onClick={() => navigate(`/productos/${producto.id_producto}`)}>
                        <FaEye/>
                        <span>ver</span>
                    </Button> */}
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