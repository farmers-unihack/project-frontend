import React, { useState } from 'react';
import './Modal.css';
import signFrameImage from './assets/cafe_sign_frame.png';
import PrettyList from './PrettyList';
import restClient from './utils/rest.util';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleTaskCompletion = async (taskId: string) => {
    await restClient.put(`/task/update`, { data: { task_id: taskId, completed: true }, headers: { "Content-Type": "application/json" } });
    const newTaskList = await restClient.get('/task/');
    setTasks(newTaskList.data);
  };

  const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = async () => {
    if (newTask.trim() !== '') {
      const response = await restClient.post('/task/create', { data: { task_name: newTask }, headers: { "Content-Type": "application/json" } });
      if (!response.success) {
        console.error('Failed to create task', response.data.msg);
        return;
      }
      const newTaskList = await restClient.get('/task/');
      setTasks(newTaskList.data);
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
