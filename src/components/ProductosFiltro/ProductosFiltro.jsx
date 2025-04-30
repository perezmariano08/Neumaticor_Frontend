import React, { useState } from 'react';
import InputCheck from '../UI/Input/InputCheck';
import { FiltroCheckboxItems, FiltroItem } from './ProductoFiltroStyles';

const ProductosFiltro = ({ brands, onFilterChange, titulo }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleCheckboxChange = (brand, filterType) => {
        const updatedSelectedItems = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
    
        setSelectedBrands(updatedSelectedItems);
        onFilterChange(updatedSelectedItems, filterType);  // Pasa el tipo de filtro (marca o vehiculo)
    };
    

    return (
        <FiltroItem>
            <FiltroCheckboxItems>
                {brands
                .filter((brand) => brand && brand.trim() !== '')
                .map((brand) => (
                    <InputCheck
                    name={brand}
                    key={brand}
                    brand={brand}
                    value={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange(brand)}
                    />
                ))}
            </FiltroCheckboxItems>
        </FiltroItem>
    );
};

export default ProductosFiltro;
