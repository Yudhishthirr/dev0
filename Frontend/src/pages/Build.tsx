import { ArrowLeft, Download } from 'lucide-react'
import '../App.css'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { FileExplorer } from '../components/FileExplorercopy'
import { Separator } from '@radix-ui/react-separator'
import { CodeEditor } from '../components/CodeEditor'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {parseBoltArtifact} from "../lib/ParserFunction"
import { BACKEND_URL } from '@/constant'
import {MonococodeEditor} from "../components/mocoCodeEditor"
import {parseBoltArtifact2} from "../lib/newparesed"
type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};

let responseText = "<boltArtifact id=\"beautiful-todo-app\" title=\"Beautiful Todo App\">\n  <boltAction type=\"file\" filePath=\"package.json\">\n    {\n      \"name\": \"vite-react-typescript-starter\",\n      \"private\": true,\n      \"version\": \"0.0.0\",\n      \"type\": \"module\",\n      \"scripts\": {\n        \"dev\": \"vite\",\n        \"build\": \"vite build\",\n        \"lint\": \"eslint .\",\n        \"preview\": \"vite preview\"\n      },\n      \"dependencies\": {\n        \"lucide-react\": \"^0.344.0\",\n        \"react\": \"^18.3.1\",\n        \"react-dom\": \"^18.3.1\",\n        \"uuid\": \"^10.0.0\"\n      },\n      \"devDependencies\": {\n        \"@eslint/js\": \"^9.9.1\",\n        \"@types/react\": \"^18.3.5\",\n        \"@types/react-dom\": \"^18.3.0\",\n        \"@types/uuid\": \"^10.0.0\",\n        \"@vitejs/plugin-react\": \"^4.3.1\",\n        \"autoprefixer\": \"^10.4.18\",\n        \"eslint\": \"^9.9.1\",\n        \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n        \"eslint-plugin-react-refresh\": \"^0.4.11\",\n        \"globals\": \"^15.9.0\",\n        \"postcss\": \"^8.4.35\",\n        \"tailwindcss\": \"^3.4.1\",\n        \"typescript\": \"^5.5.3\",\n        \"typescript-eslint\": \"^8.3.0\",\n        \"vite\": \"^5.4.2\"\n      }\n    }\n  </boltAction>\n  <boltAction type=\"shell\">\n    npm install\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"index.html\">\n    <!doctype html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Bolt Todo App</title>\n      </head>\n      <body>\n        <div id=\"root\"></div>\n        <script type=\"module\" src=\"/src/main.tsx\"></script>\n      </body>\n    </html>\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/types.ts\">\n    export interface Todo {\n      id: string;\n      text: string;\n      completed: boolean;\n    }\n\n    export type FilterType = 'all' | 'active' | 'completed';\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/components/Header.tsx\">\n    import { ListTodo } from 'lucide-react';\n\n    export const Header = () => {\n      return (\n        <header className=\"py-6 flex items-center justify-center space-x-2 text-white\">\n          <ListTodo className=\"h-8 w-8\" />\n          <h1 className=\"text-4xl font-bold tracking-tight\">Bolt Todos</h1>\n        </header>\n      );\n    };\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/components/TodoForm.tsx\">\n    import React, { useState } from 'react';\n    import { Plus } from 'lucide-react';\n\n    interface TodoFormProps {\n      onAddTodo: (text: string) => void;\n    }\n\n    export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {\n      const [inputText, setInputText] = useState('');\n\n      const handleSubmit = (e: React.FormEvent) => {\n        e.preventDefault();\n        if (inputText.trim()) {\n          onAddTodo(inputText.trim());\n          setInputText('');\n        }\n      };\n\n      return (\n        <form onSubmit={handleSubmit} className=\"flex items-center space-x-3 mb-6\">\n          <input\n            type=\"text\"\n            className=\"flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm\"\n            placeholder=\"Add a new task...\"\n            value={inputText}\n            onChange={(e) => setInputText(e.target.value)}\n          />\n          <button\n            type=\"submit\"\n            className=\"bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-1\"\n          >\n            <Plus className=\"h-5 w-5\" />\n            <span>Add</span>\n          </button>\n        </form>\n      );\n    };\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/components/TodoItem.tsx\">\n    import React, { useState } from 'react';\n    import { Todo } from '../types';\n    import { Edit, Trash2, Save, X } from 'lucide-react';\n\n    interface TodoItemProps {\n      todo: Todo;\n      onToggleComplete: (id: string) => void;\n      onDelete: (id: string) => void;\n      onEdit: (id: string, newText: string) => void;\n    }\n\n    export const TodoItem: React.FC<TodoItemProps> = ({\n      todo,\n      onToggleComplete,\n      onDelete,\n      onEdit,\n    }) => {\n      const [isEditing, setIsEditing] = useState(false);\n      const [editText, setEditText] = useState(todo.text);\n\n      const handleEditSave = () => {\n        if (editText.trim() && editText.trim() !== todo.text) {\n          onEdit(todo.id, editText.trim());\n        }\n        setIsEditing(false);\n      };\n\n      return (\n        <li className=\"flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-3 last:mb-0 transition duration-200\">\n          <div className=\"flex items-center flex-grow\">\n            <input\n              type=\"checkbox\"\n              className=\"form-checkbox h-5 w-5 text-blue-600 rounded-md cursor-pointer mr-3\"\n              checked={todo.completed}\n              onChange={() => onToggleComplete(todo.id)}\n            />\n            {isEditing ? (\n              <input\n                type=\"text\"\n                value={editText}\n                onChange={(e) => setEditText(e.target.value)}\n                onBlur={handleEditSave}\n                onKeyPress={(e) => {\n                  if (e.key === 'Enter') handleEditSave();\n                }}\n                className=\"flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400\"\n                autoFocus\n              />\n            ) : (\n              <span\n                className={`text-lg flex-grow ${\n                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'\n                }`}\n              >\n                {todo.text}\n              </span>\n            )}\n          </div>\n          <div className=\"flex space-x-2 ml-4\">\n            {isEditing ? (\n              <>\n                <button\n                  onClick={handleEditSave}\n                  className=\"p-2 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100 transition duration-150\"\n                  aria-label=\"Save todo\"\n                >\n                  <Save className=\"h-5 w-5\" />\n                </button>\n                <button\n                  onClick={() => {\n                    setIsEditing(false);\n                    setEditText(todo.text);\n                  }}\n                  className=\"p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition duration-150\"\n                  aria-label=\"Cancel edit\"\n                >\n                  <X className=\"h-5 w-5\" />\n                </button>\n              </>\n            ) : (\n              <>\n                <button\n                  onClick={() => setIsEditing(true)}\n                  className=\"p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition duration-150\"\n                  aria-label=\"Edit todo\"\n                >\n                  <Edit className=\"h-5 w-5\" />\n                </button>\n                <button\n                  onClick={() => onDelete(todo.id)}\n                  className=\"p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition duration-150\"\n                  aria-label=\"Delete todo\"\n                >\n                  <Trash2 className=\"h-5 w-5\" />\n                </button>\n              </>\n            )}\n          </div>\n        </li>\n      );\n    };\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/components/TodoList.tsx\">\n    import React from 'react';\n    import { Todo } from '../types';\n    import { TodoItem } from './TodoItem';\n\n    interface TodoListProps {\n      todos: Todo[];\n      onToggleComplete: (id: string) => void;\n      onDelete: (id: string) => void;\n      onEdit: (id: string, newText: string) => void;\n    }\n\n    export const TodoList: React.FC<TodoListProps> = ({\n      todos,\n      onToggleComplete,\n      onDelete,\n      onEdit,\n    }) => {\n      if (todos.length === 0) {\n        return (\n          <p className=\"text-center text-gray-500 text-lg mt-8\">\n            No tasks yet! Add some above.\n          </p>\n        );\n      }\n\n      return (\n        <ul className=\"space-y-3\">\n          {todos.map((todo) => (\n            <TodoItem\n              key={todo.id}\n              todo={todo}\n              onToggleComplete={onToggleComplete}\n              onDelete={onDelete}\n              onEdit={onEdit}\n            />\n          ))}\n        </ul>\n      );\n    };\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/components/FilterButtons.tsx\">\n    import React from 'react';\n    import { FilterType } from '../types';\n\n    interface FilterButtonsProps {\n      currentFilter: FilterType;\n      onFilterChange: (filter: FilterType) => void;\n    }\n\n    export const FilterButtons: React.FC<FilterButtonsProps> = ({\n      currentFilter,\n      onFilterChange,\n    }) => {\n      const filters: { label: string; value: FilterType }[] = [\n        { label: 'All', value: 'all' },\n        { label: 'Active', value: 'active' },\n        { label: 'Completed', value: 'completed' },\n      ];\n\n      return (\n        <div className=\"flex justify-center space-x-4 mb-6 mt-4\">\n          {filters.map((filter) => (\n            <button\n              key={filter.value}\n              onClick={() => onFilterChange(filter.value)}\n              className={`px-5 py-2 rounded-full font-medium transition duration-200 ${\n                currentFilter === filter.value\n                  ? 'bg-blue-600 text-white shadow-md'\n                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'\n              }`}\n            >\n              {filter.label}\n            </button>\n          ))}\n        </div>\n      );\n    };\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"src/App.tsx\">\n    import React, { useState, useEffect } from 'react';\n    import { Header } from './components/Header';\n    import { TodoForm } from './components/TodoForm';\n    import { TodoList } from './components/TodoList';\n    import { FilterButtons } from './components/FilterButtons';\n    import { Todo, FilterType } from './types';\n    import { v4 as uuidv4 } from 'uuid';\n\n    function App() {\n      const [todos, setTodos] = useState<Todo[]>(() => {\n        const savedTodos = localStorage.getItem('bolt-todos');\n        return savedTodos ? JSON.parse(savedTodos) : [];\n      });\n      const [filter, setFilter] = useState<FilterType>('all');\n\n      useEffect(() => {\n        localStorage.setItem('bolt-todos', JSON.stringify(todos));\n      }, [todos]);\n\n      const addTodo = (text: string) => {\n        const newTodo: Todo = {\n          id: uuidv4(),\n          text,\n          completed: false,\n        };\n        setTodos((prevTodos) => [...prevTodos, newTodo]);\n      };\n\n      const toggleComplete = (id: string) => {\n        setTodos((prevTodos) =>\n          prevTodos.map((todo) =>\n            todo.id === id ? { ...todo, completed: !todo.completed } : todo\n          )\n        );\n      };\n\n      const deleteTodo = (id: string) => {\n        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));\n      };\n\n      const editTodo = (id: string, newText: string) => {\n        setTodos((prevTodos) =>\n          prevTodos.map((todo) =>\n            todo.id === id ? { ...todo, text: newText } : todo\n          )\n        );\n      };\n\n      const filteredTodos = todos.filter((todo) => {\n        if (filter === 'active') {\n          return !todo.completed;\n        } else if (filter === 'completed') {\n          return todo.completed;\n        }\n        return true;\n      });\n\n      return (\n        <div\n          className=\"min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 py-10 px-4\"\n          style={{\n            backgroundImage:\n              \"url('https://images.unsplash.com/photo-1579547623190-28042455e96f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')\",\n            backgroundSize: 'cover',\n            backgroundPosition: 'center',\n            backgroundAttachment: 'fixed',\n          }}\n        >\n          <div className=\"max-w-xl mx-auto bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out\">\n            <Header />\n            <TodoForm onAddTodo={addTodo} />\n            <FilterButtons\n              currentFilter={filter}\n              onFilterChange={setFilter}\n            />\n            <TodoList\n              todos={filteredTodos}\n              onToggleComplete={toggleComplete}\n              onDelete={deleteTodo}\n              onEdit={editTodo}\n            />\n          </div>\n        </div>\n      );\n    }\n\n    export default App;\n  </boltAction>\n  <boltAction type=\"shell\">\n    npm run dev\n  </boltAction>\n</boltArtifact>"

// const fileStructure: FileNode[] = [
//   {
//     name: "src",
//     type: "folder",
//     isOpen: true,
//     children: [
//       { name: "app.tsx", type: "file", lines: 51 },
//       { name: "index.css", type: "file", lines: 51 },
//       { name: "main.tsx", type: "file", lines: 51 },
//       { name: "vite-env.d.ts", type: "file", lines: 51 },
//     ],
//   },

//   { name: "eslint.config.js", type: "file", lines: 64 },
//   { name: "index.html", type: "file", lines: 64 },
//   { name: "package.json", type: "file", lines: 64 },
//   { name: "postcss.config.js", type: "file", lines: 64 },
//   { name: "tsconfig.json", type: "file", lines: 64 },
//   { name: "tsconfig.node.json", type: "file", lines: 64 },
//   { name: "vite.config.ts", type: "file", lines: 64 },
// ]

export function Build() {
  
  const location = useLocation();

  //  const { query } = location.state as { query: string };
  const { prompt = "" } = (location.state ?? {}) as { prompt?: string };

  const init = async()=>{
      // const response = await axios.post(`${BACKEND_URL}/template`,{prompt});
      // let responseText = response.data.data.uiPrompts[0]
    
      // const structure = parseBoltArtifact({responseText});
      const structure = parseBoltArtifact2({responseText});
      // console.log(structure)
      setFileStructure(structure)
  }
  // console.log(`form the buildr page ${prompt}`)

  const [activeTab, setActiveTab] = useState<"preview" | "code">("code")

  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);

  // console.log(fileStructure)
  // let fileinfo = {}
  // fileStructure.map((file)=>{
  //     if(file.type =='file'){
  //         return file.code,file.name
  //     }
  // })  
  // const fileStructure = parseBoltArtifact({ responseText });
  useEffect(()=>{
    init()
  },[prompt])

  return (
    <>
    

    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-1">
            <Button
              variant={activeTab === "preview" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1"
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </Button>
            <Button
              variant={activeTab === "code" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs px-3 py-1 border border-gray-600"
              onClick={() => setActiveTab("code")}
            >
              Code
            </Button>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        {/* <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto"> */}
          {/* <FileExplorer files={fileStructure} /> */}
          <FileExplorer files={fileStructure} />
          
        {/* </div> */}

        <Separator orientation="vertical" className="bg-gray-700" />

        {/* Code Editor */}
        {/* <CodeEditor /> */}
        {/* <MonococodeEditor/> */}
      </div>
    </div>
  
    </>
  )
}
