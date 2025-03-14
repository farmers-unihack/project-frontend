import React from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyList from './PrettyList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tasks: string[] = [
  'Task 1 test',
  'Task 2',
  'Task 3 length var',
];
{ /* TODO: retrieve stored list of tasks */}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="section full-height">
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img 
            src={signFrameImage} 
            alt="Modal Frame" 
            className="modal-image"
          />
          <div className="overlay-list">
            <PrettyList items={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
