import React from 'react'
import { DropdownStyled } from './DropdownStyles'

const Dropdown = ({value, onChange, options, placeholder, optionLabel, optionValue, error}) => {
    return (

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%'}}>
            <DropdownStyled
                value={value} 
                onChange={onChange} 
                options={options} optionLabel={optionLabel} optionValue={optionValue}
                placeholder={placeholder}
                invalid={error}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' , fontWeight: '200'}}>{error}</span>}
        </div>
    )
}

export default Dropdown