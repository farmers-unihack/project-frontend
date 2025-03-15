import React, { useState } from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyUrlList from './PrettyUrlList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Url {
  id: string;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [urls, setUrls] = useState<Url[]>([]);

  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleUrlDeletion = (id: string) => {
    setUrls(currentUrls => currentUrls.filter((url) => url.id !== id));
  };

  const handleNewUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  const handleNewUrlSubmit = () => {
    if (newUrl.trim() !== '') {
      setUrls([...urls, { id: `${Date.now()}`, text: newUrl }]);
      setNewUrl('');
      setError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewUrlSubmit();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="section full-height">
      <div className="modal" onClick={onClose}>
        <div className="relative h-full" onClick={(e) => e.stopPropagation()}>
          <img 
            src={signFrameImage} 
            alt="Modal Frame" 
            className="h-full"
          />
          
          <div className="absolute top-[38%] left-[24%] w-[55%] h-[40%] overflow-auto">
            <PrettyUrlList 
              urls={urls} 
              toggleUrlDeletion={toggleUrlDeletion} 
              newUrl={newUrl} 
              handleNewUrlInput={handleNewUrlInput}
              handleNewUrlSubmit={handleNewUrlSubmit} 
              handleKeyDown={handleKeyDown}
            />
          </div>

          {error && <p className="task-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
