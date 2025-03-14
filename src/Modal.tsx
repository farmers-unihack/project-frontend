import React from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="section full-height">
      <div className="modal" onClick={onClose}>
        <img 
          src={signFrameImage} 
          alt="Popup Frame" 
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default Modal;