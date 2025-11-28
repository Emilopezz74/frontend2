// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
        maxWidth: '90%',
        position: 'relative'
      }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
