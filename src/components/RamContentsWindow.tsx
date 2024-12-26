import styles from '../styles/window.module.css'

interface RamContentsWindowProps {
    ram: number[];
}

function RamContentsWindow(props: RamContentsWindowProps) {
    return <div className={`${styles.window} ${styles['output-window']}`}>
        RAM Contents
        <div className={styles['output-content']}>
            {props.ram.map((value) => value === 0 ? '000' : value.toString()).join(' ')}
        </div>
    </div>
}

export default RamContentsWindow;