import React from 'react'
import { FormStyled } from './FormStyles'

const Form = ({children, bg, titulo, padding}) => {
    return (
        <FormStyled
            bg={bg}
            padding={padding}
        >
            {children}
        </FormStyled>
    )
}

export default Form