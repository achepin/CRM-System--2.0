import { Task } from '../types';

type TodosResponse = Task[] | { todos?: Task[]; data?: Task[] };

const BASE_URL = 'https://easydev.club/api/v1';

export const TodosApi = {
  getTodos(): Promise<TodosResponse> {
    return fetch(`${BASE_URL}/todos`).then((res) => res.json());
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

  deleteTodo(id: number): Promise<null> {
    return fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    }).then((res) => res.text().then((text) => (text ? JSON.parse(text) : null)));
  },
};