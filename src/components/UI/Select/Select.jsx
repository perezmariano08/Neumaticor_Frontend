import React from 'react';
import { SelectContainerStyled, SelectWrapper } from './SelectStyles';
import { VscTriangleDown } from "react-icons/vsc";
import { LiaAngleDownSolid } from 'react-icons/lia';

const Select = ({ data, placeholder, column = "nombre", onChange, id_, icon, value, disabled, name, planilla }) => {
    
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange({
            target: {
                name,
                value: selectedValue,
            }
        });
    };

    return (
        <SelectContainerStyled className={planilla ? 'planilla' : ''}>
            <SelectWrapper onChange={handleSelectChange} value={value} disabled={disabled} name={name}>
                {placeholder && <option value=''>{placeholder}</option>}
                {data?.map((item, index) => (
                    <option key={index} value={item[id_]}>
                        {item[column]}
                    </option>
                ))}
            </SelectWrapper>
            <LiaAngleDownSolid className='arrow'/>
            {/* {icon} */}
        </SelectContainerStyled>
    );
};

export default Select;
