

import Editor from '@monaco-editor/react';


export function MonococodeEditor({ code }: { code: string }) {
    return <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={code}
        options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
        }}
    />
}

