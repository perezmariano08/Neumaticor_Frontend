import React from 'react'
import { InputCheckWrapper } from './InputSyles'
import { CheckboxStyled } from './InputCheckboxStyles';

const InputCheck = ({checked, onChange, brand, name, value}) => {
    return (
        <InputCheckWrapper key={brand} onClick={onChange}>

            <CheckboxStyled 
                inputId={brand}
                name={name} 
                value={value} 
                onChange={onChange} checked={checked} 
            />

            {brand}
        </InputCheckWrapper>
    )
}

export default InputCheck