type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};

export function parseBoltArtifact({ responseText }: { responseText: string }): FileNode[] {
  const matches = [...responseText.matchAll(/<boltAction[^>]*filePath="([^"]+)"[^>]*>([\s\S]*?)<\/boltAction>/g)];

  const files: FileNode[] = [];
  const srcChildren: FileNode[] = [];

  for (const match of matches) {
    const filePath = match[1]; // e.g. 'src/App.tsx' or 'index.html'
    const content = match[2];
    const fileName = filePath.split('/').pop()!;

    const fileNode: FileNode = {
      name: fileName,
      type: "file",
      code: content,
    };

    if (filePath.startsWith("src/")) {
      srcChildren.push(fileNode);
    } else {
      files.push(fileNode);
    }
  }

  if (srcChildren.length > 0) {
    files.unshift({
      name: "src",
      type: "folder",
      isOpen: true,
      children: srcChildren,
    });
  }

  return files;
}
