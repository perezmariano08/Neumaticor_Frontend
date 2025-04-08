import React, { useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { ListaProductos, ListaProductosWrapper, ProductosFiltroWrapper, ProductsContainerStyled, ProductsWrapper } from './ProductosStyles';
import Button from '../../components/UI/Button/Button';
import ProductosFiltro from '../../components/ProductosFiltro/ProductosFiltro';
import Input from '../../components/UI/Input/Input';
import { CgSearch } from 'react-icons/cg';
import { useProductos } from '../../hooks/api/useProductos';
import { useSelector } from 'react-redux';

const Productos = () => {
    const { data: productos, error, isLoading } = useProductos();
   const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   

    console.log(productos);

    const [visibleProducts, setVisibleProducts] = useState(12);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleVerMas = () => {
        setVisibleProducts(prevVisible => prevVisible + 12);
    };

    const handleVerMenos = () => {
        setVisibleProducts(prevVisible => Math.max(prevVisible - 12, 12));
    };

    const handleFilterChange = (selectedItems, filterType) => {
        if (filterType === 'marca') {
            setFilteredBrands(selectedItems);
        }
        
        if (filterType === 'vehiculo') {
            setFilteredVehicles(selectedItems);
        }

        if (filterType === 'modelo') {
            setFilteredModels(selectedItems);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = productos
        ? productos
            .filter(product => {
                if (filteredBrands.length > 0) {
                    return filteredBrands.includes(product.marca);
                }
                return true;
            })
            .filter(product => {
                if (filteredVehicles.length > 0) {
                    return filteredVehicles.includes(product.vehiculo);
                }
                return true;
            })
            .filter(product => {
                return product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
            })
        : [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error al cargar los productos</div>;
    }

    return (
        <ProductsContainerStyled>
            <ProductsWrapper>
                <ProductosFiltroWrapper>
                    <ProductosFiltro
                        brands={[...new Set(productos?.map(product => product.marca))]}
                        onFilterChange={(selectedBrands) => handleFilterChange(selectedBrands, 'marca')}
                        titulo={'Filtrar por marca'}
                    />
                    <ProductosFiltro
                        brands={[...new Set(productos?.map(product => product.vehiculo))]}
                        onFilterChange={(selectedVehicles) => handleFilterChange(selectedVehicles, 'vehiculo')}
                        titulo={'Filtrar por vehiculo'}
                    />
                    {/* <ProductosFiltro
                        brands={[...new Set(filteredProducts?.map(product => product.modelo))]}
                        onFilterChange={(selectedVehicles) => handleFilterChange(selectedVehicles, 'modelo')}
                        titulo={'Filtrar por modelo'}
                    /> */}
                </ProductosFiltroWrapper>
                <ListaProductosWrapper>
                    <div style={{ marginBottom: '20px', width: '50%' }}>
                        <Input
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            icon={<CgSearch className='icon-input' />}
                        />
                    </div> 
                    {filteredProducts.length > 0 ? (
                        <ListaProductos>
                            {filteredProducts.slice(0, visibleProducts).map((producto) => (
                                <ProductCard key={producto.id_producto || index} producto={producto} user={user}/>
                            ))}
                        </ListaProductos>
                    ) : (
                        "No hay productos"
                    )}
                    <div style={{ marginTop: '40px', display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
                        {visibleProducts < filteredProducts.length && (
                            <Button onClick={handleVerMas} background='black' color='white'>Ver más</Button>
                        )}
                        {visibleProducts > 12 && (
                            <Button onClick={handleVerMenos} style={{ marginLeft: '10px' }}>Ver menos</Button>
                        )}
                    </div>
                </ListaProductosWrapper>
            </ProductsWrapper>
        </ProductsContainerStyled>
    );
};

export default Productos;
