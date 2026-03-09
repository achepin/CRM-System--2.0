import { useState, useEffect } from 'react';
import { TodosApi } from '../API/TodosApi.tsx';
import { Task } from '../types.tsx';
import TodoForm from '../components/TodoForm';
import TodoFilters from '../components/TodoFilters';
import TodoList from '../components/TodoList';

type Filter = 'all' | 'completed' | 'isDone';

function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // тут все задачи для счетчиков
  useEffect(() => {
    TodosApi.getTodos().then((data) => setAllTasks(data));
  }, []);

  // При смене фильтра запрос на сервер
  useEffect(() => {
    TodosApi.getTodos(filter).then((data) => setTasks(data));
  }, [filter]);

  const handleAddTodo = (title: string) => {
    TodosApi.addTodo(title).then((newTask) => {
      setAllTasks((prev) => [...prev, newTask]);
      // Я заметил что если открыта вкладка "Сделано", новая задача там отображалась, хотя она не должна. Поэтому добавил проверку.
      if (filter !== 'isDone') {
        setTasks((prev) => [...prev, newTask]);
      }
    });
  };

  const handleToggle = (id: number) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;
    TodosApi.toggleTodo(id, !task.isDone).then((updatedTask) => {
      setAllTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      TodosApi.getTodos(filter).then((data) => setTasks(data));
    });
  };

  const handleEdit = (id: number, title: string) => {
    TodosApi.editTodo(id, title).then((updatedTask) => {
      setAllTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...updatedTask, isDone: t.isDone } : t))
      );
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...updatedTask, isDone: t.isDone } : t))
      );
    });
  };

  const handleDelete = (id: number) => {
    TodosApi.deleteTodo(id).then(() => {
      setAllTasks((prev) => prev.filter((t) => t.id !== id));
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });
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
