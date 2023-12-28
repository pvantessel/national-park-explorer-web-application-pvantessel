import './Button.css';

// eslint-disable-next-line react/prop-types
function Button({ buttonType, buttonClass, clickHandler, buttonState, children }) {
    return (
        <button
            type={buttonType}
            className={buttonClass}
            onClick={clickHandler}
            disabled={buttonState}
        >
            {children}
        </button>
    );
}

export default Button;