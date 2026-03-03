// Компонент для отображения фильтров задач (все, в работе, сделано)

type Filter = 'all' | 'completed' | 'isDone';

interface TodoFiltersProps {
  filter: Filter;
  totalCount: number;
  activeCount: number;
  doneCount: number;
  onFilterChange: (filter: Filter) => void;
}

function TodoFilters({
  filter,
  totalCount,
  activeCount,
  doneCount,
  onFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="filters">
      <button
        onClick={() => onFilterChange('all')}
        className={filter === 'all' ? 'active' : ''}
      >
        Все ({totalCount})
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        В работе ({activeCount})
      </button>
      <button
        onClick={() => onFilterChange('isDone')}
        className={filter === 'isDone' ? 'active' : ''}
      >
        Сделано ({doneCount})
      </button>
    </div>
  );
}

export default TodoFilters;
