import { ArrowLeft, Download } from 'lucide-react'
import '../App.css'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { FileExplorer } from '../components/FileExplorercopy'
import { Separator } from '@radix-ui/react-separator'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { BACKEND_URL } from '@/constant'
import { useWebContainer } from '../hooks/useWebcontainners'
import { WebContainer } from '@webcontainer/api';
import { parseBoltArtifact2 } from "../lib/newparesed"
import { PreviewFrame } from '@/components/PreviewFrame'
import { convertToWebContainerFS } from '@/lib/convertdata'

type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};



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
  const webcontainer = useWebContainer()
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("code")

  const { prompt = "" } = (location.state ?? {}) as { prompt?: string };
  
  const init = async () => {

    if(!prompt){
        return null;
    }
    const response = await axios.post(`${BACKEND_URL}/template`, { prompt });

    const responseText = response.data.response.uiPrompts[0];
    
  
    const prompts = response.data.response.prompts;
    const structure = parseBoltArtifact2({ responseText });
    
    setFileStructure(structure)
    

    const files = convertToWebContainerFS(fileStructure);

  
    webcontainer?.mount(files);
   
    const airesponse = await axios.post(`${BACKEND_URL}/chat`, {
      message: [...prompts, prompt].map(content => ({
        role: "user",
        content
      }))
    }
    );
    const newrespone = airesponse.data.response.kwargs.content
  

    const structure2 = parseBoltArtifact2({ responseText: newrespone });
    setFileStructure(prev => {
      return prev.map(item => {
        if (item.name === 'src' && item.type === 'folder') {
          // Get the new `src` from updated structure
          const newSrc = structure2.find(f => f.name === 'src' && f.type === 'folder');

          if (!newSrc || !newSrc.children) return item;

          // Keep these files from old src
          const filesToKeep = (item.children || []).filter(child =>
            ['index.css', 'main.tsx', 'vite-env.d.ts'].includes(child.name)
          );

          // Merge: old files to keep + new files
          return {
            ...item,
            children: [...filesToKeep, ...newSrc.children],
          };
        }

        return item;
      });
    });
    

  }


  useEffect(() => {
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
                onClick={() =>  setActiveTab("code")}
              >
                Code
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200">
            <Download className="w-4 h-4" />
          </Button>
        </div>


        <div className="flex flex-1 overflow-hidden">

          <FileExplorer files={fileStructure} />

          <Separator orientation="vertical" className="bg-gray-700" />


        </div>
      </div>

    </>
  )
}
