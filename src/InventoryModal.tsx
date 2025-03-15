import React from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import { collectibles } from './collectibles';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedCollectibles: string[];
}

const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose, unlockedCollectibles }) => {
  if (!isOpen) return null;

  return (
    <div className="section full-height">
      <div className="modal" onClick={onClose}>
        <div className="relative h-full" onClick={(e) => e.stopPropagation()}>
          <img src={signFrameImage} alt="Modal Frame" className="h-full" />

          <div className="absolute top-[40%] left-[28%] w-[55%] h-[28%] grid grid-cols-3 grid-rows-2 gap-4">
            {collectibles.map((item, index) => (
              <div
                key={index}
                className={`w-[100px] h-[100px] flex justify-center items-center rounded-lg ${
                  unlockedCollectibles.includes(item.name) ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;
