import { FeaturedProductsContainer, FeaturedProductsWrapper, ProductsContainer } from "./FeaturedProductsStyles"
import ProductCard from '../../pages/Productos/ProductCard/ProductCard'
import { useProductosDestacados } from "../../hooks/api/useProductos";

const FeaturedProducts = () => {
    // Obtener el estado de los productos desde el store
    const { data: productos, error, isLoading } = useProductosDestacados();

    return (
        <FeaturedProductsContainer className="container">
            <FeaturedProductsWrapper className="wrapper">
                <h2>productos destacados</h2>
                <ProductsContainer>
                    {
                        productos?.map((producto) => {
                            return <ProductCard key={producto.id_producto} producto={producto} />
                        })
                    }
                </ProductsContainer>
            </FeaturedProductsWrapper>
        </FeaturedProductsContainer>
    )
}

export default FeaturedProducts