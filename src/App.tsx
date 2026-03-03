import { useState, useEffect } from 'react';
import { TodosApi } from './API/TodosApi.tsx';
import { Task } from './types.tsx';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';

type Filter = 'all' | 'completed' | 'isDone';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    TodosApi.getTodos().then((data) => {
      const list = Array.isArray(data)
        ? data
        : (data?.todos ?? data?.data ?? []);
      setTasks(list);
    });
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return !task.isDone;
    if (filter === 'isDone') return task.isDone;
    return true;
  });

  const handleAddTodo = (title: string) => {
    TodosApi.addTodo(title).then((newTask) => {
      setTasks([...tasks, newTask]);
    });
  };

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleEdit = (id: number, title: string) => {
    TodosApi.editTodo(id, title).then((updatedTask) => {
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...updatedTask, isDone: t.isDone } : t
        )
      );
    });
  };

  const handleDelete = (id: number) => {
    TodosApi.deleteTodo(id).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div className="container">
      <TodoForm onAdd={handleAddTodo} />
      <TodoFilters
        filter={filter}
        totalCount={tasks.length}
        activeCount={tasks.filter((t) => !t.isDone).length}
        doneCount={tasks.filter((t) => t.isDone).length}
        onFilterChange={setFilter}
      />
      <TodoList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
