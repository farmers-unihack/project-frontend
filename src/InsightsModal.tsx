import React, { useState } from 'react';
import './Modal.css';
import './PrettyList.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import StyledText from './StyledText'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFocusTime: number;
}

const InsightsModal: React.FC<ModalProps> = ({ isOpen, onClose, totalFocusTime }) => {
  // const [users, setUsers] = useState<{ username: string, hours: number }[]>([]);
  const [users, setUsers] = useState([
    { username: 'Ali', hours: 10 },
    { username: 'Frances', hours: 8 },
    { username: 'Matthew', hours: 12 },
    { username: 'Oscar', hours: 9 },
  ]);
  const sortedUsers = [...users].sort((a, b) => b.hours - a.hours);

  // Get from backend the users array and sort in descending order comparing hours
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
            <StyledText>
              Total Time Worked:
            </StyledText>
            <div
              style={{
                listStyle: "none",
                margin: 0,
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                fontSize: "35px",
                textAlign: "center",
                fontFamily: '"Gloria Hallelujah", cursive',
              }}
            >
              {totalFocusTime} hours!!
            </div>
            <StyledText>
              Current Leaderboard:
            </StyledText>
            <ul style={{ textAlign: "center", padding: 0, listStyle: "none" }}>
              {sortedUsers.map((user, index) => (
                <li
                  key={user.username}
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: '"Gloria Hallelujah", cursive',
                  }}
                >
                  {index + 1}. {user.username} - {user.hours} hours
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsModal;
