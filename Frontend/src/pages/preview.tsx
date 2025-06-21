import { convertToWebContainerFS } from "@/lib/convertdata";
import { useEffect, useRef, useState } from 'react';
import { WebContainer } from "@webcontainer/api";

export const PreviewPage = () => {
  const [url, setUrl] = useState("");
  const webContainerRef = useRef<WebContainer | null>(null);

  async function initmain() {
    // Prevent multiple WebContainer boot calls
    if (webContainerRef.current) return;

    // Boot the WebContainer
    const webcontainerInstance = await WebContainer.boot();
    webContainerRef.current = webcontainerInstance;

    // Load files from localStorage and mount them
    const storedData = JSON.parse(localStorage.getItem('files') || 'null');
    const files = convertToWebContainerFS(storedData);
    await webcontainerInstance.mount(files);

    // Run `npm install`
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

    // Run `npm run dev`
    await webcontainerInstance.spawn('npm', ['run', 'dev']);

    // Wait for the server to be ready and get the preview URL
    webcontainerInstance.on('server-ready', (port, url) => {
      console.log("Dev server running at:", url);
      setUrl(url);
    });
  }

  useEffect(() => {
    initmain();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center text-gray-400">
      {!url && (
        <div className="text-center">
          <p className="mb-2">Loading WebContainer...</p>
        </div>
      )}
      {url && (
        <iframe
          src={url}
          width="100%"
          height="900px"
          sandbox="allow-scripts allow-same-origin"
     
        />
      )}
    </div>
  );
};
