import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/Modal.jsx'
import * as groupsService from '../hooks/GroupService.js';
import Button from '../components/ButtonDelete';

const ModalDelete = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onDelete = (e) => {
    e.preventDefault();

    setMessage('');
    setIsLoading(true);

    groupsService
      .remove(group.id)
      .then(() => {
        setIsOpen(false);
        onSuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <Modal title="Eliminar Grupo" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onDelete}>
        <div className="flex flex-col gap-4 justify-center py-2">
          <p>¿Estas seguro que quieres eliminar este grupo? toda la informacion se borrará</p>
          <Button className="" disabled={isLoading} text="Yes, Delete" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

ModalDelete.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalDelete;

