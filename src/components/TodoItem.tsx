// Компонент для редактирования и отображения одной задачи

import { useState } from 'react';
import { Task } from '../types/Task';

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed.length < 2) {
      setError('Не менее 2 символов');
      return;
    }
    if (trimmed.length > 64) {
      setError('Не более 64 символов');
      return;
    }
    setError('');
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setError('');
    setIsEditing(false);
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
        onChange={() => onToggle(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <button onClick={() => setIsEditing(true)}>Редактировать</button>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  );
}

export default TodoItem;
