import React from 'react';

function FormInputField({ labelName, labelText, inputType, inputName, inputValue, setInput, required, placeholder }) {
    return (
        <div>
            <label htmlFor={labelName}>{labelText}</label>
            <input
                type={inputType}
                id={inputName}
                name={inputName}
                value={inputValue}
                required={required}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
}

export default FormInputField;