import { Button } from "@/components/ui/button"

import {  ChevronRight,  Download, Copy  } from "lucide-react"


export function CodeEditor() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">app</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-gray-300">page.tsx</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 p-4 font-mono text-sm">
        <div className="flex">
          <div className="text-gray-500 mr-4 select-none">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
          <div className="flex-1">
            <div className="text-gray-300">
              <span className="text-pink-400">export</span> <span className="text-pink-400">default</span>{" "}
              <span className="text-pink-400">function</span> <span className="text-blue-400">Page</span>
              <span className="text-yellow-400">()</span> <span className="text-yellow-400">{"{"}</span>
            </div>
            <div className="text-gray-300 ml-4">
              <span className="text-pink-400">return</span> <span className="text-gray-400">{"<"}</span>
              <span className="text-red-400">BoltEditor</span> <span className="text-gray-400">{"/>"}</span>
            </div>
            <div className="text-yellow-400">{"}"}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}