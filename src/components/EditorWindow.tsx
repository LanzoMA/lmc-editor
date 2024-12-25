import styles from '../styles/window.module.css'
import buttonStyles from '../styles/buttons.module.css'

function EditorWindow() {
    return <div className={styles.window}>
        <div className={styles.header}>
            Editor
            <div style={{ display: 'flex', gap: '1em' }}>
                <button>Assemble in RAM</button>
                <button className={buttonStyles['run-button']}>Run</button>
            </div>
        </div>
    </div>
}

export default EditorWindow;