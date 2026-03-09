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
    try {
      const [filtered, all] = await Promise.all([
        TodosApi.getTodos(filter),
        TodosApi.getTodos(),
      ]);
      setTasks(filtered);
      setAllTasks(all);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
    }
  };

  // При монтировании и смене фильтра — запрос с сервера
  useEffect(() => {
    updateTasks();
  }, [filter]);

  const handleAddTodo = async (title: string) => {
    try {
      await TodosApi.addTodo(title);
      await updateTasks();
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  const handleToggle = async (id: number) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;
    try {
      await TodosApi.toggleTodo(id, !task.isDone);
      await updateTasks();
    } catch (error) {
      console.error('Ошибка переключения задачи:', error);
    }
  };

  const handleEdit = async (id: number, title: string) => {
    try {
      await TodosApi.editTodo(id, title);
      await updateTasks();
    } catch (error) {
      console.error('Ошибка редактирования задачи:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TodosApi.deleteTodo(id);
      await updateTasks();
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
    }
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
