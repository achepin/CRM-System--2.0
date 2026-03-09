// Компонент для редактирования и отображения одной задачи

import { useState } from 'react';
import { Task } from '../types/Task';
import { TodosApi } from '../API/TodosApi.tsx';

interface TodoItemProps {
  task: Task;
  updateTasks: () => Promise<void>;
}

function TodoItem({ task, updateTasks }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [error, setError] = useState('');

  const handleSave = async () => {
    const trimmed = editText.trim();
    if (trimmed.length < 2) {
      setError('Не менее 2 символов');
      return;
    }
    if (trimmed.length > 64) {
      setError('Не более 64 символов');
      return;
    }
    try {
      setError('');
      await TodosApi.editTodo(task.id, trimmed);
      await updateTasks();
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка редактирования задачи:', err);
    }
  };

  const handleCancel = () => {
    setEditText(task.title);
    setError('');
    setIsEditing(false);
  };

  const handleToggle = async () => {
    try {
      await TodosApi.toggleTodo(task.id, !task.isDone);
      await updateTasks();
    } catch (err) {
      console.error('Ошибка переключения задачи:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await TodosApi.deleteTodo(task.id);
      await updateTasks();
    } catch (err) {
      console.error('Ошибка удаления задачи:', err);
    }
  };

  if (isEditing) {
    return (
      <li key={task.id} className="editing">
        <div className="editing-row">
          <input
            type="text"
            value={editText}
            onChange={(e) => { setEditText(e.target.value); setError(''); }}
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={handleCancel}>Отмена</button>
        </div>
        <div className="form-error">
          <span>{error}</span>
        </div>
      </li>
    );
  }

  return (
    <li className={task.isDone ? 'done' : ''}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={handleToggle}
      />
      <span className="task-title">{task.title}</span>
      <button onClick={() => setIsEditing(true)}>Редактировать</button>
      <button onClick={handleDelete}>Удалить</button>
    </li>
  );
}

export default TodoItem;
