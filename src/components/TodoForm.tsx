// компонент для добавления новой задачи

import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    setError('');
    onAdd(title);
    input.value = '';
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
