// Styles
import styles from '../Nav.module.scss';
// Icons
import { FaHouseChimney, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
// Dependencies
import { Link } from 'react-router-dom';
import icon from '../../../../assets/img/default/profile-picture.jpg';
import { useState } from 'react';
import { LogOutButon } from '../../logoutbutton/LogOutButon';

export const Nav = () => {
	const [nav, setNav] = useState(false);

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__imgContainer}>
				<img src={icon} alt='user icon' className={styles.nav__img} />
			</div>
			<div className={styles.nav__buttonContainer}>
				<button type='button' role='button' className={styles.nav__button}>
					<FaBell />
				</button>
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
					<Link to='/indexStudent' className={styles.nav__link}>
						<FaHouseChimney /> Inicio
					</Link>
				</li>
				<li>
					<Link to='/filter' className={styles.nav__link}>
						<FaMagnifyingGlass /> Buscar
					</Link>
				</li>
				<li>
					<Link to='/profile' className={styles.nav__link}>
						<CgProfile /> Mi Pefil
					</Link>
				</li>
				<li>
					<LogOutButon className={styles.nav__buttonLogOut}/>
				</li>
			</ul>
		</nav>
	);
};
