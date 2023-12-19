import './Button.css';

// eslint-disable-next-line react/prop-types
function Button({ buttonType, buttonClass, clickHandler, children }) {
    return (
        <button
            type={buttonType}
            className={buttonClass}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

export default Button;