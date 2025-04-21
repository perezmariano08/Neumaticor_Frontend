import React, { useState } from 'react';
import Input from '../UI/Input/Input';
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
                {brands.map((brand) => (
                <InputCheck
                    key={brand}
                    brand={brand} 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckboxChange(brand)}
                />
                    // <div key={brand}>
                    //     <label>
                    //         <input
                    //             type="checkbox"
                    //             
                    //         />
                    //         {brand}
                    //     </label>
                    // </div>
                ))}
            </FiltroCheckboxItems>
            
        </FiltroItem>
    );
};

export default ProductosFiltro;
