import styles from '../styles/navigation.module.css'

function NavigationBar() {
    return <nav>
        <ul className={styles['navigation-list']}>
            <li className={styles['navigation-item']}>About</li>
            <li className={styles['navigation-item']}>
                <a href='https://www.vivaxsolutions.com/web/lmc.aspx'>Examples</a>
            </li>
        </ul>
    </nav>
}

export default NavigationBar