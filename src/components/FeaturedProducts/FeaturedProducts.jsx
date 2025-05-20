import { FeaturedProductsContainer, FeaturedProductsWrapper, ProductsContainer } from "./FeaturedProductsStyles"
import ProductCard from "../ProductCard/ProductCard";
import { ListaProductos } from "../../pages/Productos/ProductosStyles";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useProductosConPrecio } from "../../api/productos/useProductos";

const FeaturedProducts = () => {
    const navigate = useNavigate()
    // Obtener el estado de los productos desde el store
    const { data: productos, error, isLoading } = useProductosConPrecio();
    // Filtrar los productos en oferta y mezclarlos aleatoriamente
    const productosOferta = productos
        ?.filter((p) => p.oferta === "S")
        .sort(() => Math.random() - 0.5)
        .slice(0, 4); // Tomar solo 4
    
    return (
        <FeaturedProductsContainer>
            <FeaturedProductsWrapper>
                <h2>productos en oferta</h2>
                <ListaProductos>
                    {
                        productosOferta?.map((producto) => {
                            return <ProductCard key={producto.id_producto} producto={producto} />
                        })
                    }
                </ListaProductos>
                <Button background="black-900" color="white-0" onClick={()=> navigate('/productos?order=OrderByOffer')}>
                    Ver más ofertas
                    <RiArrowRightSLine />
                </Button>
            </FeaturedProductsWrapper>
        </FeaturedProductsContainer>
    )
}

export default FeaturedProducts