// ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductContainerStyled, ProductImageWrapper, ProductInfoWrapper, ProductWrapper } from './ProductoStyles';
import { useSelector } from 'react-redux';

const Producto = () => {
    const { products } = useSelector((state) => state.products)
    const { productId } = useParams();
    return (
      <ProductContainerStyled>
        {
          Object.entries(products).map(([, items]) => {
            return items.map((item) => {
              if (item.id == productId) {
                return <ProductWrapper key={item.id}>
                  <ProductImageWrapper>
                    <img src={`/products/${item.img}`}/>
                  </ProductImageWrapper>
                  <ProductInfoWrapper>
                    <h1>{item.title}</h1>
                    <p>Mostrando detalles para el producto con ID: {item.id}</p>
                  </ProductInfoWrapper>
                </ProductWrapper>
              }
            })
        })
        }
      </ProductContainerStyled>
    );
};

export default Producto;
