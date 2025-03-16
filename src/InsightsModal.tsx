import React, { useEffect, useState } from 'react';
import './Modal.css';
import './PrettyList.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import StyledText from './StyledText'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFocusTime: number;
  userLeaderboard: any;
}

const convertSecondstoTime = (input_seconds) => {
  let hours = Math.floor(input_seconds / 3600);
  let minutes = Math.floor((input_seconds - (hours * 3600)) / 60);
  let seconds = input_seconds - (hours * 3600) - (minutes * 60);

  return hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
}

const InsightsModal: React.FC<ModalProps> = ({ isOpen, onClose, totalFocusTime, userLeaderboard }) => {
  const [users, setUsers] = useState<{ username: string, seconds: number, time: string }[]>([]);

  useEffect(() => {
    const track = []
    for (let x of userLeaderboard) {
      track.push({ username: x.username, seconds: x.focus_time_seconds, time: convertSecondstoTime(x.focus_time_seconds) });
    }
    const sortedUsers = [...users].sort((a, b) => b.seconds - a.seconds);
    setUsers(sortedUsers)
  }, [userLeaderboard])

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
              {users.map((user, index) => (
                <li
                  key={user.username}
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: '"Gloria Hallelujah", cursive',
                  }}
                >
                  {index + 1}. {user.username} - {user.time} hours
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
