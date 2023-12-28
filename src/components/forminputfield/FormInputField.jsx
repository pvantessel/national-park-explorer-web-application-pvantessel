
// eslint-disable-next-line react/prop-types
function FormInputField({labelName, labelClass, labelText, inputType, inputName, inputValue, setInput, required, placeholder, inputClass }) {
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
                className={inputClass}
            />
        </>
    );
}

export default FormInputField;