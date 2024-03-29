// Styles
import styles from '../Nav.module.scss';
// Icons
import { FaHouseChimney, FaMagnifyingGlass } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
// Dependencies
import { Link } from 'react-router-dom';
import icon from '../../../../assets/img/default/icon.png';
import { useState } from 'react';

export const Nav = () => {
	const [nav, setNav] = useState(false);

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__imgContainer}>
				<img src={icon} alt='user icon' className={styles.nav__img} />
			</div>
			<div className={styles.nav__buttonContainer}>
				<button
					type='button'
					role='button'
					className={styles.nav__buttonNav}
					onClick={() => setNav(!nav)}
				>
					<span className={styles.nav__span}></span>
					<span className={styles.nav__span}></span>
					<span className={styles.nav__span}></span>
				</button>
			</div>
			<ul
				role='nav'
				className={nav ? styles.nav__list : styles.nav__listHidden}
			>
				<li>
					<Link to='/studentIndex' className={styles.nav__link}>
						<FaHouseChimney /> Inicio
					</Link>
				</li>
				<li>
					<Link to='/buscador' className={styles.nav__link}>
						<FaMagnifyingGlass /> Buscar
					</Link>
				</li>
				<li>
					<button
						type='button'
						role='button'
						className={styles.nav__buttonLogOut}
					>
						<IoLogOut /> Cerrar Sesion
					</button>
				</li>
			</ul>
		</nav>
	);
};
