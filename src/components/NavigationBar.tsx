import styles from '../styles/navigation.module.css'

function NavigationBar() {
    return <nav>
        <ul>
            <li className={styles['navigation-item']}>About</li>
            <li className={styles['navigation-item']}>Examples</li>
        </ul>
    </nav>
}

export default NavigationBar