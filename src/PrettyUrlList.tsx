import React from 'react';
import './PrettyList.css';
import TextField from '@mui/material/TextField';
import dot from './assets/chalk_star.gif';

interface PrettyListProps {
  urls: { 
    id: string;
    text: string;
  }[];
  toggleUrlDeletion: (id: string) => void;
  newUrl: string;
  handleNewUrlInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewUrlSubmit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PrettyUrlList: React.FC<PrettyListProps> = ({ urls, toggleUrlDeletion, newUrl, handleNewUrlInput, handleNewUrlSubmit, handleKeyDown }) => {
  return (
  <ul className="pretty-list">
    {urls.map((url, index) => (
      <li key={index} className="pretty-list-item flex items-center space-x-2">
        <img 
            src={dot} 
            alt="Dot" 
            className="task-dot cursor-pointer mt-3" 
            style={{ width: '5%', height: '5%' }}
          />
        <span onClick={() => toggleUrlDeletion(url.id)} className="hover:line-through whitespace-nowrap hover:text-gray-200 cursor-pointer">
          {url.text}
        </span>
      </li>
    ))}
    <li className="flex items-center space-x-2">
        <img 
            src={dot} 
            alt="Dot" 
            className="task-dot cursor-pointer mt-4" 
            style={{ width: '5%', height: '5%' }}
          />
      <TextField
          label="Add url..."
          variant="standard"
          type="text"
          value={newUrl}
          onChange={handleNewUrlInput}
          onBlur={handleNewUrlSubmit}
          onKeyDown={handleKeyDown}
          sx={{
            input: { color: 'white', fontFamily: '"Gloria Hallelujah", sans-serif'},  
            label: { color: 'white', fontFamily: '"Gloria Hallelujah", sans-serif'}, 
            '& .MuiInput-underline:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' }, 
            '& .MuiInput-underline:hover:after': { borderBottomColor: 'white' }, 
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

export default PrettyUrlList;
