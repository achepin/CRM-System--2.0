// Компонент для отображения списка задач

import { Task } from '../types/Task';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  updateTasks: () => Promise<void>;
}

function TodoList({ tasks, updateTasks }: TodoListProps) {
  return (
    <div className="tasks">
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            updateTasks={updateTasks}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
