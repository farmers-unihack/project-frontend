import React from 'react';
import './PrettyList.css';
import TextField from '@mui/material/TextField';

interface PrettyListProps {
  tasks: { 
    id: string;
    name: string;
    completed: boolean;
  }[];
  toggleTaskCompletion: (taskId: string, taskCompleted: boolean) => void;
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
          onChange={() => toggleTaskCompletion(task.id, task.completed)}
          className="cursor-pointer task-checkbox mt-2"
        />
        <span onClick={() => toggleTaskCompletion(task.id, task.completed)} className={`hover:line-through whitespace-nowrap hover:text-gray-200 cursor-pointer ${task.completed ? 'line-through text-gray-200' : ''}`}>
          {task.name}
        </span>
      </li>
    ))}
    <li className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={false}
          className="cursor-pointer mt-4"
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
            input: { color: 'white', fontFamily: '"Gloria Hallelujah", sans-serif'},  
            label: { color: 'white', fontFamily: '"Gloria Hallelujah", sans-serif'}, 
            '& .MuiInput-underline:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover:after': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
            '& .MuiInputLabel-root:hover': { color: 'white' },
            width: '100%'
          }}
      />
    </li>
  </ul>
  );
};

export default PrettyList;
