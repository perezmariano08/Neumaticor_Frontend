import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { ListaProductos } from '../Productos/ProductosStyles';
import ProductCard from '../../components/ProductCard/ProductCard';
import { SearchContainer, SearchWrapper } from './SearchStyles';
import NavegacionPages from '../../components/NavegacionPages/NavegacionPages';
import { LiaAngleRightSolid } from 'react-icons/lia';
import { useProductosConPrecio } from '../../api/productos/useProductos';

const Search = () => {
    const { termino } = useParams();
    const terminoBusqueda = decodeURIComponent(termino).toLowerCase();
    const { data: productos, error, isLoading } = useProductosConPrecio();    
    const productosFiltrados = productos?.filter(producto => 
        producto.descripcion?.toLowerCase().includes(terminoBusqueda) ||
        producto.marca?.toLowerCase().includes(terminoBusqueda) ||
        producto.vehiculo?.toLowerCase().includes(terminoBusqueda) ||
        producto.modelo?.toLowerCase().includes(terminoBusqueda)
    );

    if (isLoading) {
        return <SearchContainer>
            <SearchWrapper>
                Cargando...
            </SearchWrapper>
        </SearchContainer>
    }
    if (error) return <p>Error al cargar productos.</p>;

    return (
        <SearchContainer>
            <SearchWrapper>
                <NavegacionPages>
                    <NavLink to={'/'}>Inicio</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={'/productos'}>Productos</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={`/buscar/${encodeURIComponent(termino)}`}>{terminoBusqueda}</NavLink>
                </NavegacionPages>
                <h3>Resultados de búsqueda: <strong>"{terminoBusqueda}"</strong></h3>
                {productosFiltrados?.length ? (
                    <ListaProductos>
                        {productosFiltrados.map(producto => (
                            <ProductCard key={producto.id_producto} producto={producto} />
                        ))}
                    </ListaProductos>
                ) : (
                    <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                )}
            </SearchWrapper>
            
        </SearchContainer>
    );
};

export default Search