import { ArrowLeft, Download } from 'lucide-react'
import '../App.css'
import axios from 'axios'
import { Button } from '../components/ui/button'
import { FileExplorer } from '../components/FileExplorercopy'
import { Separator } from '@radix-ui/react-separator'

import { convertToWebContainerFS } from '@/lib/convertdata'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { BACKEND_URL } from '@/constant'

import {PreviewFrame} from "../components/PreviewFrame"
import { parseBoltArtifact2 } from "../lib/newparesed"
import {downloadCodeFile} from "../lib/downloadCodeFile"
import { MonococodeEditor } from '@/components/mocoCodeEditor'

import { WebContainer } from '@webcontainer/api';

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  code?: string
  isOpen?: boolean
}

export function Build() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prompt = queryParams.get('prompt');
  console.log("here is prompt");

  console.log(prompt)
  if(!prompt){
      console.log("Prompt is not defined")
      return null
  }

  const [selectedFile, setSelectedFile] = useState("")
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);
  const [isFileStructureUpdated,setIsFileStrucutreUpdated] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"preview" | "code">("code")
  const [url, setUrl] = useState("");
  
  
  function handleDownload(){
      if(isFileStructureUpdated){
        downloadCodeFile(fileStructure)
      }
      return null;
  }


  async function previewwebconter(){

      console.log("booting....")
      const webcontainerInstance = await WebContainer.boot();
      const webcontainerfiles =  convertToWebContainerFS(fileStructure)
      await webcontainerInstance.mount(webcontainerfiles);

      const installProcess = await webcontainerInstance.spawn('npm', ['install']);
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log(`[npm install]: ${data}`);
        }
      }));

      const installExitCode = await installProcess.exit;
      if (installExitCode !== 0) {
          throw new Error('npm install failed');
      }

      await webcontainerInstance.spawn('npm', ['run', 'dev']);

      webcontainerInstance.on('server-ready', (port, url) => {
          console.log("Dev server running at:", url);
          setUrl(url);
      });
  }
  function handlepreview(){
    
    setActiveTab("preview");
    previewwebconter()
    

  }
  const init = async () => {
    try{
          const response = await axios.post(`${BACKEND_URL}/template`, { prompt });
          const responseText = response.data.response.uiPrompts[0];
          const prompts = response.data.response.prompts;
          const structure = parseBoltArtifact2({ responseText });
      
          setFileStructure(structure)
      
    
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
          setIsFileStrucutreUpdated(true)

      }
      catch (error) {
          console.log(`something went worng while api calling may be prompt not defied of rendering error ${error}`)
      }
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
                disabled={!isFileStructureUpdated}
                onClick={handlepreview}
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
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-200" disabled={!isFileStructureUpdated}  onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
        </div>


        <div className="flex flex-1 overflow-hidden">

          <FileExplorer files={fileStructure}  onFileSelect={setSelectedFile}/>

          <Separator orientation="vertical" className="bg-gray-700" />

          {
              isFileStructureUpdated && activeTab === "code" ? <MonococodeEditor code={selectedFile}/>
              : activeTab === "preview" ? <PreviewFrame url={url}/> :  <div className="flex justify-center items-center h-[800px] w-[80%]">
             <span className="text-white text-lg font-medium tracking-wide">Generating your project files, please wait...</span>
              </div>
          }
        </div>
      </div>

    </>
  )
}
