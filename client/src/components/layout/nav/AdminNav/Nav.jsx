//Styles
import styles from './Nav.module.scss';
//Icons
import { FaMagnifyingGlass, FaUsers } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
//Dependencies
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LogOutButon } from '../../logoutbutton/LogOutButon';

export const Nav = () => {
	const [nav, setNav] = useState(false);

	return (
		<nav className={styles.nav}>
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
			<ul
				role='nav'
				className={nav ? styles.nav__list : styles.nav__listHidden}
			>
				<li>
					<button type='button' role='button' className={styles.nav__buttonNav}>
					<FaBell /> Notificaciones		11111										11111	111	1
					</button>
				</li>
				<li>
					<Link className={styles.nav__link} to='user-management'>
						<FaUsers /> Usuarios
					</Link>
				</li>
				<li>
					<Link className={styles.nav__link} to='reports'>
						<MdReport /> Reportes
					</Link>
				</li>
				<li>
					<Link to='/filter' className={styles.nav__link}>
						<FaMagnifyingGlass /> Buscar
					</Link>
				</li>
				<li>
					<LogOutButon componentClass={styles.nav__buttonNav} />
				</li>
			</ul>
		</nav>
	);
};
