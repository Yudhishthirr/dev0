import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from "lucide-react"
import { useState } from "react"
import { MonococodeEditor } from "./mocoCodeEditor"
import { Separator } from "@radix-ui/react-separator"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  code?: string
  isOpen?: boolean
}

// Separate component for rendering the file tree
function FileTree({ 
  files, 
  level = 0, 
  openFolders, 
  toggleFolder, 
  onFileClick 
}: { 
  files: FileNode[]
  level?: number
  openFolders: Set<string>
  toggleFolder: (folderName: string) => void
  onFileClick: (code: string) => void
}) {
  return (
    <>
      {files.map((file, index) => (
        <div key={index}>
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-800 cursor-pointer group"
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={(e) => {
              if (file.type === "folder") {
                toggleFolder(file.name)
              } else {
                // Prevent event bubbling for file clicks
                e.stopPropagation()
                onFileClick(file.code ?? "")
              }
            }}
          >
            {file.type === "folder" && (
              <>
                {openFolders.has(file.name) ? (
                  <ChevronDown className="w-4 h-4 mr-1 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1 text-gray-400" />
                )}
                {openFolders.has(file.name) ? (
                  <FolderOpen className="w-4 h-4 mr-2 text-blue-400" />
                ) : (
                  <Folder className="w-4 h-4 mr-2 text-blue-400" />
                )}
              </>
            )}
            {file.type === "file" && <FileText className="w-4 h-4 mr-2 ml-5 text-gray-400" />}
            <span className="text-gray-300 flex-1">{file.name}</span>
          </div>
          {file.type === "folder" && file.children && openFolders.has(file.name) && (
            <FileTree 
              files={file.children} 
              level={level + 1} 
              openFolders={openFolders}
              toggleFolder={toggleFolder}
              onFileClick={onFileClick}
            />
          )}
        </div>
      ))}
    </>
  )
}

export function FileExplorer({ files, level = 0 }: { files: FileNode[]; level?: number }) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(["src", "components", "data", "public", "types"])
  )
  const [code, setCode] = useState("")

  const toggleFolder = (folderName: string) => {
    const newOpenFolders = new Set(openFolders)
    if (newOpenFolders.has(folderName)) {
      newOpenFolders.delete(folderName)
    } else {
      newOpenFolders.add(folderName)
    }
    setOpenFolders(newOpenFolders)
  }

  const handleFileClick = (fileCode: string) => {
    setCode(fileCode)
  }

  console.log(code)

  return (
    <>
      <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
        <div className="text-sm">
          <FileTree 
            files={files}
            level={level}
            openFolders={openFolders}
            toggleFolder={toggleFolder}
            onFileClick={handleFileClick}
          />
        </div>
      </div>
      <Separator orientation="vertical" className="bg-gray-700" />
      <MonococodeEditor code={code} />
    </>
  )
}