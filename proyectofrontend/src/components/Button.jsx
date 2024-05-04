import React from 'react';
import PropTypes from 'prop-types';

export const CustomButton = ({ text, onClick, disabled }) => {
    const buttonStyle = {
        backgroundColor: disabled ? 'gray' : 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px', // Corrección en la propiedad 'borderRadius'
        cursor: 'pointer',
        opacity: disabled ? 0.5 : 1,
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            disabled={disabled}    
        >
            {text}
        </button>
    );
};

CustomButton.defaultProps = {
    disabled: false,
};

export default CustomButton;