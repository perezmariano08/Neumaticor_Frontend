import React, { useState, forwardRef } from 'react';
import { InputContainerStyled, InputWrapper } from './InputSyles';
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai';

const Input = forwardRef(({ placeholder, type = "text", icon, className, isError, name, value, onChange, errorMessage, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <>
            <InputWrapper
                name={name}
                ref={ref}
                type={inputType}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                {...props} // Pasar todos los props al campo de entrada
            />
            {type === 'password' && (
                <div className='hi-eye' onMouseDown={togglePasswordVisibility} role="button" aria-label="Toggle Password Visibility">
                    {showPassword ? <AiOutlineEye /> : <AiFillEyeInvisible className='eye-off' />}
                </div>
            )}
            {isError && <span className='error-message'>{errorMessage}</span>}
        </>
    );
});

export default Input;
