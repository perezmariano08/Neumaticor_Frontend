import React from 'react'
import { InputTextWrapperStyled } from './InputTextStyles'

const InputTextWrapper = ({children, label}) => {
    return (
        <InputTextWrapperStyled>
            <p>{label}</p>
            {children}
        </InputTextWrapperStyled>
    )
}

export default InputTextWrapper