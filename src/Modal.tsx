import React, { useState } from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyList from './PrettyList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Task {
  text: string;
  completed: boolean;
  timeoutId?: NodeJS.Timeout;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleTaskCompletion = (index: number) => {
    setTasks(prevTasks => {
      return prevTasks.map((task, i) => {
        if (i === index) {
          if (!task.completed) {
            const timeoutId = setTimeout(() => {
              setTasks(currentTasks => currentTasks.filter((_, j) => j !== index));
            }, 5000);
            return { ...task, completed: true, timeoutId };
          } else {
            if (task.timeoutId) clearTimeout(task.timeoutId);
            return { ...task, completed: false, timeoutId: undefined };
          }
        }
        return task;
      });
    });
  };

  const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewTaskSubmit();
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
            <PrettyList 
              tasks={tasks} 
              toggleTaskCompletion={toggleTaskCompletion} 
              newTask={newTask} 
              handleNewTaskInput={handleNewTaskInput}
              handleNewTaskSubmit={handleNewTaskSubmit} 
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
