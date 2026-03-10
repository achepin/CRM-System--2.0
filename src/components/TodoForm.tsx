// компонент для добавления новой задачи

import React, { useState } from 'react';
import { TodosApi } from '../API/TodosApi.tsx';

interface TodoFormProps {
  updateTasks: () => Promise<void>;
}

function TodoForm({ updateTasks }: TodoFormProps) {
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    const title = input.value.trim();

    if (title.length < 2) {
      setError('Задача должна содержать не менее 2 символов');
      return;
    }
    if (title.length > 64) {
      setError('Задача не должна превышать 64 символа');
      return;
    }

    try {
      setError('');
      await TodosApi.addTodo(title);
      await updateTasks();
      input.value = '';
    } catch (err) {
      console.error('Ошибка добавления задачи:', err);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <input placeholder="Напишите задачу" onChange={() => setError('')} />
        <button type="submit">Отправить</button>
      </form>
      <div className="form-error">
        <span>{error}</span>
      </div>
    </div>
  );
}

export default TodoForm;
