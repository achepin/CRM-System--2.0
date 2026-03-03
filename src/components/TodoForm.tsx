// компонент для добавления новой задачи

import React from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    const title = input.value.trim();
    if (!title) return;
    onAdd(title);
    input.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Напишите задачу" />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default TodoForm;
