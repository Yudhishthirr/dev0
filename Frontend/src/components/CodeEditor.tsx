import { ChevronRight, Copy, Download } from "lucide-react";
import { Button } from "./ui/button";

// export function CodeEditor({ code, fileName }: { code: string; fileName: string }) {
export function CodeEditor() {
  // const lines = code.split("\n");

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">app</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          {/* <span className="text-gray-300">"{fileName}"</span> */}
          <span className="text-gray-300">"fileName"</span>
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
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        <div className="flex">
          <div className="text-gray-500 mr-4 select-none text-right">
            {/* {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))} */}
          </div>
          {/* <div className="flex-1 text-gray-300 whitespace-pre">
            {code}
          </div> */}
          <div className="flex-1 text-gray-300 whitespace-pre overflow-auto">
            <pre>
              <code>
                {`
                import js from '@eslint/js';
                import globals from 'globals';
                import reactHooks from 'eslint-plugin-react-hooks';
                import reactRefresh from 'eslint-plugin-react-refresh';
                import tseslint from 'typescript-eslint';

                export default tseslint.config(
                {ignores: ['dist'] },
                {
                extends: [js.configs.recommended, ...tseslint.configs.recommended],
                files: ['**/*.{ts, tsx}'],
                languageOptions: {
                  ecmaVersion: 2020,
                globals: globals.browser,
                },
                plugins: {
                  'react-hooks': reactHooks,
                'react-refresh': reactRefresh,
                },
                rules: {
                  ...reactHooks.configs.recommended.rules,
                  'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true },
                ],
                },
                }
                );
                `}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
