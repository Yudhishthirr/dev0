

import Editor from '@monaco-editor/react';


export function MonococodeEditor({ code }: { code: string }) {
    return (
        // <div> 
            <Editor
                height="100%"
                width="100%"
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
        // {/* </div> */}
    )
}

