import React, { useState } from 'react';
import './PrettyList.css';

interface PrettyListProps {
  items: string[];
}

const PrettyList: React.FC<PrettyListProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(items.map(() => false));

  const handleCheckboxChange = (index: number): void => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <ul className="pretty-list">
      {items.map((item, index) => (
        <li key={index} className="pretty-list-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
              className="task-checkbox"
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PrettyList;
