import { useState, useEffect } from 'react';
import { TodosApi } from '../API/TodosApi.tsx';
import { Task } from '../types/Task';
import TodoForm from '../components/TodoForm';
import TodoFilters from '../components/TodoFilters';
import TodoList from '../components/TodoList';

type Filter = 'all' | 'completed' | 'isDone';

function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const updateTasks = async () => {
    const [filtered, all] = await Promise.all([
      TodosApi.getTodos(filter),
      TodosApi.getTodos(),
    ]);
    setTasks(filtered);
    setAllTasks(all);
  };

  // При монтировании и смене фильтра — запрос с сервера
  useEffect(() => {
    updateTasks();
  }, [filter]);

  const handleAddTodo = async (title: string) => {
    await TodosApi.addTodo(title);
    await updateTasks();
  };

  const handleToggle = async (id: number) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;
    await TodosApi.toggleTodo(id, !task.isDone);
    await updateTasks();
  };

  const handleEdit = async (id: number, title: string) => {
    await TodosApi.editTodo(id, title);
    await updateTasks();
  };

  const handleDelete = async (id: number) => {
    await TodosApi.deleteTodo(id);
    await updateTasks();
  };

  return (
    <div className="container">
      <TodoForm onAdd={handleAddTodo} />
      <TodoFilters
        filter={filter}
        totalCount={allTasks.length}
        activeCount={allTasks.filter((t) => !t.isDone).length}
        doneCount={allTasks.filter((t) => t.isDone).length}
        onFilterChange={setFilter}
      />
      <TodoList
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TodoListPage;
