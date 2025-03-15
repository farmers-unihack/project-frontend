import React, { useState } from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyList from './PrettyList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          if (!task.completed) {
            setTimeout(() => {
              setTasks(currentTasks => currentTasks.filter((task) => task.id !== taskId));
            }, 2000);
            return { ...task, completed: true };
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
      console.log("hey");
      setTasks([...tasks, { id: `${Date.now()}`, text: newTask, completed: false }]);
      setNewTask('');
      setError(null);
    }
    console.log(tasks);
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
