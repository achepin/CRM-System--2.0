// Компонент для редактирования и отображения одной задачи

import { useState } from 'react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li key={task.id}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleCancel}>Отмена</button>
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
      {task.title}
      <button onClick={() => setIsEditing(true)}>Редактировать</button>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  );
}

export default TodoItem;
