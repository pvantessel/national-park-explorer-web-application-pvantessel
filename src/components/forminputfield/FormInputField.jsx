
// eslint-disable-next-line react/prop-types
function FormInputField({labelName, labelClass, labelText, inputType, inputName, inputValue, setInput, required, placeholder, onFocus,onBlur, inputClass, readOnly}) {
    return (
        <>
            <label htmlFor={labelName} className={labelClass}>{labelText}</label>
            <input
                type={inputType}
                id={inputName}
                name={inputName}
                value={inputValue}
                required={required}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                className={inputClass}
                readOnly={readOnly}
            />
        </>
    );
}

export default FormInputField;