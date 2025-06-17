import { ArrowLeft, Download } from 'lucide-react'
import './App.css'
// import LandingPage from './components/landingpage'
import { Button } from './components/ui/button'
import { FileExplorer } from './components/FileExplorer'
import { Separator } from '@radix-ui/react-separator'
import { CodeEditor } from './components/CodeEditor'
import { useState } from 'react'

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  lines?: number
  isOpen?: boolean
}


const fileStructure: FileNode[] = [
  {
    name: "app",
    type: "folder",
    isOpen: true,
    children: [{ name: "page.tsx", type: "file", lines: 4 }],
  },
  {
    name: "components",
    type: "folder",
    isOpen: true,
    children: [
      { name: "chat-input.tsx", type: "file", lines: 51 },
      { name: "code-editor.tsx", type: "file", lines: 88 },
      { name: "file-explorer.tsx", type: "file", lines: 139 },
      { name: "project-description.tsx", type: "file", lines: 79 },
      { name: "project-header.tsx", type: "file", lines: 48 },
      { name: "terminal.tsx", type: "file", lines: 49 },
    ],
  },
  {
    name: "data",
    type: "folder",
    isOpen: true,
    children: [{ name: "project-data.ts", type: "file", lines: 571 }],
  },
  {
    name: "public",
    type: "folder",
    isOpen: true,
    children: [{ name: "bolt-codeview.png", type: "file" }],
  },
  {
    name: "types",
    type: "folder",
    isOpen: true,
    children: [{ name: "index.ts", type: "file", lines: 16 }],
  },
  { name: "bolt-editor.tsx", type: "file", lines: 64 },
]

function App() {
  
   const [activeTab, setActiveTab] = useState<"preview" | "code">("code")
  return (
    <>
    {/* <LandingPage/>*/}

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
        <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
          <FileExplorer files={fileStructure} />
        </div>

        <Separator orientation="vertical" className="bg-gray-700" />

        {/* Code Editor */}
        <CodeEditor />
      </div>
    </div>
  
    </>
  )
}

export default App
