import { Task } from '../types/Task';

type Filter = 'all' | 'completed' | 'isDone';

const BASE_URL = 'https://easydev.club/api/v1';

export const TodosApi = {
  getTodos(filter?: Filter): Promise<Task[]> {
    return fetch(`${BASE_URL}/todos`)
      .then((res) => res.json())
      .then((data): Task[] => {
        const list: Task[] = Array.isArray(data) ? data : (data?.todos ?? data?.data ?? []);
        if (filter === 'isDone') return list.filter((t) => t.isDone);
        if (filter === 'completed') return list.filter((t) => !t.isDone);
        return list;
      });
  },

  addTodo(title: string): Promise<Task> {
    return fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
  },

  editTodo(id: number, title: string): Promise<Task> {
    return fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());
  },

  toggleTodo(id: number, isDone: boolean): Promise<Task> {
    return fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone }),
    }).then((res) => res.json());
  },

  deleteTodo(id: number): Promise<null> {
    return fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    }).then((res) => res.text().then((text) => (text ? JSON.parse(text) : null)));
  },
};