import React from 'react';
import './PrettyList.css';

interface PrettyListProps {
  items: { text: string; completed: boolean }[];
  toggleTaskCompletion: (index: number) => void;
}

const PrettyList: React.FC<PrettyListProps> = ({ items, toggleTaskCompletion }) => {
  return (
    <ul className="pretty-list">
      {items.map((item, index) => (
        <li key={index} className="pretty-list-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              onChange={() => toggleTaskCompletion(index)}
              className="task-checkbox"
            />
            {item.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PrettyList;
