import React, { useState } from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyList from './PrettyList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_TASKS = 5;

interface Task {
  text: string;
  completed: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: 'Task 1 test', completed: false },
    { text: 'Task 2', completed: false },
    { text: 'Task 3 length var', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (tasks.length >= MAX_TASKS) {
      setError(`Task limit reached! (Max ${MAX_TASKS} tasks)`);
      return;
    }

    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setError(null);
    }
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };
  
  if (!isOpen) return null;

  return (
    <div className="section full-height">
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <img 
            src={signFrameImage} 
            alt="Modal Frame" 
            className="modal-image"
          />
          
          <div className="overlay-list">
            <PrettyList items={tasks} toggleTaskCompletion={toggleTaskCompletion} />
          </div>

          <div className="task-input-container">
            <input
              type="text"
              placeholder="Enter a task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="task-input"
              disabled={tasks.length >= MAX_TASKS}
            />
          </div>
          <div className="task-button-container">
            <button onClick={addTask} className="task-button" disabled={tasks.length >= MAX_TASKS}>
              Add Task
            </button>
          </div>

          {error && <p className="task-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
