import Editor from '@monaco-editor/react'
import styles from '../styles/window.module.css'
import buttonStyles from '../styles/buttons.module.css'
import React from 'react';

interface EditorWindowProps {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    generateRamOutput: () => void;
    generateOutput: () => void;
}

function EditorWindow(props: EditorWindowProps) {
    function onChange(code: string | undefined) {
        props.setCode(code as string);
    }

    return <div className={`${styles.window} ${styles['editor-window']}`}>
        <div className={styles.header}>
            Editor
            <div style={{ display: 'flex', gap: '1em' }}>
                <button onClick={props.generateRamOutput}>Assemble in RAM</button>
                <button className={buttonStyles['run-button']} onClick={props.generateOutput}>Run</button>
            </div>
        </div>
        <div style={{ flex: 1 }}>
            <Editor
                theme='vs-dark'
                value={props.code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    scrollbar: {
                        vertical: 'hidden',
                    },
                    overviewRulerLanes: 0,
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    </div>
}

export default EditorWindow;