import React, { useState } from 'react';
import { AccordionContent, FiltroOrden, Filtros, ListaProductos, ListaProductosWrapper, ProductosFiltroWrapper, ProductosMain, ProductsContainerStyled, ProductsWrapper } from './ProductosStyles';
import Button from '../../components/UI/Button/Button';
import ProductosFiltro from '../../components/ProductosFiltro/ProductosFiltro';
import { useMarcas, useProductosConPrecio } from '../../hooks/api/useProductos';
import { useSelector } from 'react-redux';
import SkeletonProductCard from '../../components/ProductCard/SkeletonProductCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Accordion, AccordionTab } from 'primereact/accordion';
import NavegacionPages from '../../components/NavegacionPages/NavegacionPages';
import { NavLink } from 'react-router-dom';
import { LiaAngleRightSolid } from "react-icons/lia";
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';
import { RiArrowUpDownLine } from "react-icons/ri";
import InputText from '../../components/UI/InputText/InputText';


const Productos = () => {
    // const { data: productos, error, isLoading } = useProductos();
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    const{ data: productos, error, isLoading }  = useProductosConPrecio();
    const{ data: marcas }  = useMarcas();
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(marcas);
    
    // Filtros Accordion
    const filtros = [
        { tipo: 'marca', label: 'Marca', campo: 'marca' },
        { tipo: 'vehiculo', label: 'Vehículo', campo: 'vehiculo' },
    ];  
    
    const [visibleProducts, setVisibleProducts] = useState(12);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Funciones botones VER MAS y VER MENOS
    const handleVerMas = () => {
        setVisibleProducts(prevVisible => prevVisible + 12);
    };
    const handleVerMenos = () => {
        setVisibleProducts(prevVisible => Math.max(prevVisible - 12, 12));
    };


    // Filtros
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

    // Manejador Input Busqueda
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
                return product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
            })
        : [];

    const order = searchParams.get('order') || 'asc';
    const orderOptions = [
        { name: 'Nombre: A-Z', code: 'OrderByNameASC' },
        { name: 'Nombre: Z-A', code: 'OrderByNameDESC' },
        { name: 'Precio: menor a mayor', code: 'OrderByPriceASC' },
        { name: 'Precio: mayor a menor', code: 'OrderByPriceDESC' },
    ];    
    const orderedProducts = [...filteredProducts].sort((a, b) => {
        switch (order) {
            case 'OrderByNameASC':
                return a.descripcion.localeCompare(b.descripcion);
            case 'OrderByNameDESC':
                return b.descripcion.localeCompare(a.descripcion);
            case 'OrderByPriceASC':
                return a.precio - b.precio;
            case 'OrderByPriceDESC':
                return b.precio - a.precio;
            default:
                return 0;
        }
    });
    

    if (isLoading) {
        return (
            <ProductsContainerStyled>
                <ProductsWrapper>
                    <NavegacionPages>
                        <NavLink to={'/'}>Inicio</NavLink>
                        <LiaAngleRightSolid />
                        <NavLink to={'/productos'}>Productos</NavLink>
                    </NavegacionPages>
                    <ProductosMain>
                        <ProductosFiltroWrapper>
                            <Accordion activeIndex={0} >
                                <AccordionTab header="Marca">
                                    
                                </AccordionTab>
                            </Accordion>
                            <Accordion activeIndex={0} >
                                <AccordionTab header="Vehiculo">
                                    
                                </AccordionTab>
                            </Accordion>
                        </ProductosFiltroWrapper>
                        <ListaProductosWrapper>
                            <Filtros>
                                <FiltroOrden>
                                    <InputText 
                                        name="busqueda"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="¿Qué estas buscando?"
                                    />
                                </FiltroOrden>
                                <FiltroOrden>
                                    <p><RiArrowUpDownLine/>Ordenar por:</p>
                                    <Dropdown 
                                        value={order} 
                                        onChange={(e) => {
                                            searchParams.set('order', e.value);
                                            setSearchParams(searchParams);
                                        }} 
                                        options={orderOptions} 
                                        optionLabel="name"
                                        optionValue="code" // 👈 Esto es clave
                                        placeholder="Ordenar"
                                    />
                                </FiltroOrden>
                            </Filtros> 
                            <ListaProductos>
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <SkeletonProductCard key={index} />
                                ))}
                            </ListaProductos>
                        </ListaProductosWrapper>
                    </ProductosMain>
                    
                </ProductsWrapper>
            </ProductsContainerStyled>
        );
    }

    if (error) {
        return <div>Error al cargar los productos</div>;
    }

    return (
        <ProductsContainerStyled>
            <ProductsWrapper>
                <NavegacionPages>
                    <NavLink to={'/'}>Inicio</NavLink>
                    <LiaAngleRightSolid />
                    <NavLink to={'/productos'}>Productos</NavLink>
                </NavegacionPages>
                <ProductosMain>
                    <ProductosFiltroWrapper>
                        {filtros?.map(({ tipo, label, campo }) => (
                            <Accordion key={tipo} activeIndex={0}>
                                <AccordionTab header={label}>
                                    <AccordionContent>
                                        <ProductosFiltro
                                            brands={[...new Set(productos?.map(product => product[campo]))]}
                                            onFilterChange={(selectedItems) => handleFilterChange(selectedItems, tipo)}
                                        />
                                    </AccordionContent>
                                </AccordionTab>
                            </Accordion>
                        ))}
                    </ProductosFiltroWrapper>
                    <ListaProductosWrapper>
                        <Filtros>
                            <FiltroOrden>
                                <InputText 
                                    name="busqueda"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="¿Qué estas buscando?"
                                />
                            </FiltroOrden>
                            <FiltroOrden>
                                <p><RiArrowUpDownLine/>Ordenar por:</p>
                                <Dropdown 
                                    value={order} 
                                    onChange={(e) => {
                                        searchParams.set('order', e.value);
                                        setSearchParams(searchParams);
                                    }} 
                                    options={orderOptions} 
                                    optionLabel="name"
                                    optionValue="code" // 👈 Esto es clave
                                    placeholder="Ordenar"
                                />
                            </FiltroOrden>
                        </Filtros> 
                        {filteredProducts.length > 0 ? (
                            <ListaProductos>
                                {orderedProducts.slice(0, visibleProducts).map((producto) => (
                                    <ProductCard key={producto.id_producto} producto={producto} user={user}/>
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
                </ProductosMain>
                
            </ProductsWrapper>
        </ProductsContainerStyled>
    );
};

export default Productos;
