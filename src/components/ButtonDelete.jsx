// ButtonDelete.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ButtonDelete = ({ onClick }) => (
  <button onClick={onClick} className="bg-coffee hover:bg-orange-900 text-white font-bold py-4 px-4 rounded border m-1 p-5">
    Eliminar
  </button>
);

ButtonDelete.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default ButtonDelete;
