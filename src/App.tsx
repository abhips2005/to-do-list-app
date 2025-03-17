import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Todo List</h1>
          
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-50`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
                >
                  {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No todos yet. Add some tasks to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;