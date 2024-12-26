import styles from '../styles/window.module.css'

interface OutputWindowProps {
    output: string;
}

function OutputWindow(props: OutputWindowProps) {
    return <div className={`${styles.window} ${styles['output-window']}`}>
        Output

        <div className={styles['output-content']}>
            {props.output}
        </div>
    </div>
}

export default OutputWindow;