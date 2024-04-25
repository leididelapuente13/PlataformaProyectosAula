// Styles
import styles from './Menu.module.scss';
// Icons
import { IoIosCloseCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
// Dependencies
import PropTypes from 'prop-types';

const Menu = ({ closeMenu, projectId }) => {
	return (
		<div className={styles.menuContainer}>
			<div className={styles.menu}>
				<button type='button' className={styles.menu__buttonClose} onClick={closeMenu}>
					<IoIosCloseCircle />
				</button>
				<button type='button' className={styles.menu__button}>
					<MdDelete />
					<p>Eliminar</p>
				</button>
				<button type='button' className={styles.menu__button}>
					<FaEdit />
					<p>Editar</p>
				</button>
				<button type='button' className={styles.menu__button}>
					<MdReport />
					<p>Reportar</p>
				</button>
			</div>
		</div>
	);
};

Menu.propTypes = {
	closeMenu: PropTypes.func,
	projectId: PropTypes.number,
};

export default Menu;
