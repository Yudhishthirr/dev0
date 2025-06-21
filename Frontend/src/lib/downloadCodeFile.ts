import JSZip from "jszip";
import { saveAs } from 'file-saver';

export type FileNode = {
  name: string;
  type: "file" | "folder";
  code?: string;
  isOpen?: boolean;
  children?: FileNode[];
};

export const downloadCodeFile = async (fileStructure: FileNode[]) => {
  const zip = new JSZip();

  const addToZip = (nodes: FileNode[], folder: JSZip) => {
    nodes.forEach((node) => {
      if (node.type === "file" && node.code !== undefined) {
        folder.file(node.name, node.code);
      } else if (node.type === "folder" && node.children) {
        const subFolder = folder.folder(node.name);
        if (subFolder) {
          addToZip(node.children, subFolder);
        }
      }
    });
  };

  addToZip(fileStructure, zip);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "project.zip");
};