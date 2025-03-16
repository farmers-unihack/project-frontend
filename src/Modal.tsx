import React, { useEffect, useState } from 'react';
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
  completion_date: {$date: string};
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const SHOWN_TIME_FRAME = 60e3 * 30; // 30 minutes
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const taskList = await restClient.get('/task/');
    if (!taskList.success) {
      console.error('Failed to fetch tasks', taskList.data.msg);
      setError('Failed to fetch tasks');
      return;
    }
    const filteredTasks = taskList.data.filter((task: Task) => {
      if (!task.completed) {
        return true;
      }
      const completedAt = new Date(task.completion_date.$date).getTime();
      const oneHourAgo = new Date(Date.now() - SHOWN_TIME_FRAME).getTime();
      return completedAt >= oneHourAgo;
    });

    setTasks(filteredTasks);
  };

  useEffect(() => {

    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (taskId: string, taskCompletedState: boolean) => {
    await restClient.post(`/task/update`, { data: { task_id: taskId, task_completed: !taskCompletedState }, headers: { "Content-Type": "application/json" } });
    await fetchTasks();
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
      } ``
      await fetchTasks();
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
