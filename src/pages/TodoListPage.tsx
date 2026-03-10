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

  return (
    <div className="container">
      <TodoForm updateTasks={updateTasks} />
      <TodoFilters
        filter={filter}
        totalCount={allTasks.length}
        activeCount={allTasks.filter((t) => !t.isDone).length}
        doneCount={allTasks.filter((t) => t.isDone).length}
        onFilterChange={setFilter}
      />
      <TodoList
        tasks={tasks}
        updateTasks={updateTasks}
      />
    </div>
  );
}

export default TodoListPage;
