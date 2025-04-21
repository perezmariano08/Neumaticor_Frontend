import React from 'react'
import { InputTextStyled } from './InputTextStyles'

const InputText = ({ name, value, onChange, placeholder, required, error, disabled, type}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' , width: '100%'}}>
            <InputTextStyled
                required={required}
                name={name} 
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={error ? 'p-invalid' : ''}
                type={type}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' , fontWeight: '200'}}>{error}</span>}
        </div>
    );
};


export default InputText