import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { ProductButtons, ProductCardInfo, ProductCardWrapper, ProductTitle } from './ProductCardStyles';

const ImageSkeletonWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1 / 1; // cuadrado
    border-radius: 20px;
    overflow: hidden;
`;

const SkeletonProductCard = () => {
    return (
        <ProductCardWrapper>
        <ImageSkeletonWrapper>
            <Skeleton width="100%" height="100%" />
        </ImageSkeletonWrapper>
        <ProductCardInfo>
            <ProductTitle>
                <span><Skeleton width="30%" /></span>
                <h2><Skeleton width="90%" /></h2>
            </ProductTitle>
            <p className='price'><Skeleton width="50%" height={20}/></p>
            <ProductButtons>
                <Skeleton width="100%" height={30} borderRadius={20}/>
                {/* <Skeleton width="100%" height={30} borderRadius={20}/> */}
            </ProductButtons>
        </ProductCardInfo>
        </ProductCardWrapper>
    );
};

export default SkeletonProductCard;
