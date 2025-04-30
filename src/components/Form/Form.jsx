import React from 'react'
import { FormStyled } from './FormStyles'

const Form = ({children}) => {
    return (
        <FormStyled>
            {children}
        </FormStyled>
    )
}

export default Form