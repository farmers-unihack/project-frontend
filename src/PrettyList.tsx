import React from 'react';
import './PrettyList.css';
import TextField from '@mui/material/TextField';

interface PrettyListProps {
  tasks: { text: string; completed: boolean }[];
  toggleTaskCompletion: (index: number) => void;
  newTask: string;
  handleNewTaskInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTaskSubmit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PrettyList: React.FC<PrettyListProps> = ({ tasks, toggleTaskCompletion, newTask, handleNewTaskInput, handleNewTaskSubmit, handleKeyDown }) => {
  return (
  <ul className="pretty-list">
    {tasks.map((task, index) => (
      <li key={index} className="pretty-list-item flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(index)}
          className="cursor-pointer"
        />
        <span className={task.completed ? 'line-through text-gray-400' : ''}>
          {task.text}
        </span>
      </li>
    ))}
    <li className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={false}
          className="cursor-pointer"
        />
      <TextField
          label="New task..."
          variant="standard"
          type="text"
          value={newTask}
          onChange={handleNewTaskInput}
          onBlur={handleNewTaskSubmit}
          onKeyDown={handleKeyDown}
          sx={{
            input: { color: 'white' },  
            label: { color: 'white' }, 
            '& .MuiInput-underline:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            '& .MuiInputLabel-root:hover': { color: 'white' },
            marginTop: '-15px' 
          }}
      />
    </li>
  </ul>
  );
};

export default PrettyList;
