import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ title, isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          X
        </span>
        <h1 className="text-2xl mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
