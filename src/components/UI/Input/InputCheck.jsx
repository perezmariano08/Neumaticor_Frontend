import React from 'react'
import { InputCheckWrapper } from './InputSyles'
import { Checkbox } from 'primereact/checkbox';

const InputCheck = ({checked, onChange, brand}) => {
    return (
        <InputCheckWrapper key={brand} onClick={onChange}>

            <Checkbox 
                inputId="ingredient1" 
                name="pizza" 
                value="Cheese" 
                onChange={onChange} checked={checked} 
            />

            {brand}
        </InputCheckWrapper>
    )
}

export default InputCheck