import styles from './Header.module.css';

function Header() {
	return (
		<img
			/* className='logo' */ className={styles.logo}
			src='/logo.svg'
			alt='logo du journal'
		/>
	);
}

export default Header;
