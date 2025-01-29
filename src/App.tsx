import React, { useState } from 'react'
import { CheckCircle, Trash2 } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          <span className="text-blue-500">Todo</span> List
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-2 ${todo.completed ? 'text-green-500' : 'text-gray-500'}`}
                >
                  <CheckCircle />
                </button>
                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Trash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
