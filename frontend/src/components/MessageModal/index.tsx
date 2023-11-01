import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface Props {
    open: boolean;
    onClose?: () => void;
    message: string;
    title?: string;
}

const MessageModal = ({ open, onClose, message, title }: Props) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', border: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2 id="modal-modal-title">{title || 'Aviso'}</h2>
          <p id="modal-modal-description">{message}</p>
          <Button onClick={onClose}>Fechar</Button>
        </Box>
      </Modal>
    );
};

export {MessageModal};
  