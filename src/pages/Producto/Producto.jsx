// ProductDetails.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContainerStyled, ProductImageWrapper, ProductInfoWrapper, ProductoAgregarCantidad, ProductoAgregarCarritoWrapper, ProductWrapper } from './ProductoStyles';
import { IMAGES_URL } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import { addToCart } from '../../redux/cart/cartSlice';
import { useToast } from '../../context/ToastContext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useProducto } from '../../api/productos/useProductos';

const Producto = () => {
   const id_producto = parseInt(useParams().id_producto, 10);   
   const dispatch = useDispatch()
   const { data: producto, error, isLoading } = useProducto(id_producto);
   const [ quantity, setQuantity ] = useState(1)
   const toast = useToast(); // Usamos el hook para acceder al Toast
   const [loading, setLoading] = useState(false); 

   // Si hay error, mostrar mensaje
   if (error) {
      return <p>Error al cargar el producto.</p>;
   }

   // Si está cargando, mostrar un mensaje de carga
   if (isLoading) {
      return <p>Cargando...</p>;
   }

   // Verificamos que el producto tenga la estructura que esperamos
   if (!producto) {
      return <p>Producto no encontrado.</p>;
   }   
   
   const añadirProducto = () => {
      setLoading(true); // Activar loader
      // Simula un proceso asíncrono
      setTimeout(() => {
         dispatch(addToCart({product:{...producto}, quantity: quantity}))
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
      <ProductContainerStyled>
         <ProductWrapper>
            <ProductImageWrapper>
               <img src={`${IMAGES_URL}/productos/automovil/prestiva.png`}/>
            </ProductImageWrapper>
            <ProductInfoWrapper>
               <h1>{producto?.descripcion}</h1>
               <h2>$ {formatPrice(producto?.precio)}</h2>
               <ProductoAgregarCarritoWrapper>
                  <ProductoAgregarCantidad>
                     <span
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        style={{ cursor: 'pointer' }}
                     >
                        -
                     </span>

                     <p>{quantity}</p>

                     <span
                        onClick={() => setQuantity(prev => prev + 1)}
                        style={{ cursor: 'pointer' }}
                     >
                        +
                     </span>
                  </ProductoAgregarCantidad>
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
                              <span>agregar al carrito</span>
                           </>
                     )}
                  </Button>
               </ProductoAgregarCarritoWrapper>

            </ProductInfoWrapper>
         </ProductWrapper>
      </ProductContainerStyled>
   );
};

export default Producto;
