type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};

export function parseBoltArtifact2({ responseText }: { responseText: string }): FileNode[] {
  const matches = [...responseText.matchAll(/<boltAction[^>]*filePath="([^"]+)"[^>]*>([\s\S]*?)<\/boltAction>/g)];
  
  const root: FileNode[] = [];

  for (const match of matches) {
    const filePath = match[1]; // e.g., 'src/components/Header.tsx'
    const content = match[2];
    const parts = filePath.split('/'); // ['src', 'components', 'Header.tsx']

    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        // Final part is a file
        currentLevel.push({
          name: part,
          type: 'file',
          code: content,
        });
      } else {
        // Folder part — check if already exists
        let folder = currentLevel.find(f => f.name === part && f.type === 'folder');
        if (!folder) {
          folder = {
            name: part,
            type: 'folder',
            isOpen: true,
            children: [],
          };
          currentLevel.push(folder);
        }
        currentLevel = folder.children!;
      }
    }
  }

  return root;
}
