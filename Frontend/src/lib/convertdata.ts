type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};


type WebContainerFile = {
  file: {
    contents: string;
  };
};

type WebContainerDirectory = {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
};

type WebContainerFS = {
  [key: string]: WebContainerFile | WebContainerDirectory;
};

function convertToWebContainerFS(nodes: FileNode[]): WebContainerFS {
  const result: WebContainerFS = {};

  for (const node of nodes) {
    if (node.type === 'file') {
      result[node.name] = {
        file: {
          contents: node.code || '',
        },
      };
    } else if (node.type === 'folder' && node.children) {
      result[node.name] = {
        directory: convertToWebContainerFS(node.children),
      };
    }
  }

  return result;
}
export {convertToWebContainerFS}