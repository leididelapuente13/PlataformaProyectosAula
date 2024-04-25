// Styles
import styles from './Menu.module.scss';
// Icons
import { IoIosCloseCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
// Request
import { deleteProjectRequest } from '../../../api/projectsApi';
// Dependencies
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { WarningContext } from '../../../context/WarningContext';

export const Menu = ({ closeMenu, projectId, authorId }) => {
	const role = localStorage.getItem('role');
	const userId = localStorage.getItem('role');

	const { setVisible, visible } = useContext(WarningContext);

	const queryClient = useQueryClient();

	const deleteProject = useMutation(deleteProjectRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post'] }),
				setVisible((prev) => ({ ...prev, deleteMyProjectSuccess: true }));
		},
	});

	const handleDelete = async () => {
		try {
			await deleteProject(projectId);
		} catch (error) {
			console.error(error);
			setVisible((prev) => ({ ...prev, deleteMyProjectError: true }));
			console.log(visible.deleteMyProjectError);
		}
	};

	return (
		<div className={styles.menuContainer}>
			<div className={styles.menu}>
				<button
					type='button'
					className={styles.menu__buttonClose}
					onClick={closeMenu}
				>
					<IoIosCloseCircle />
				</button>
				{(role === 1 || userId === authorId) && (
					<button type='button' className={styles.menu__button} onClick={()=>handleDelete()}>
						<MdDelete />
						<p>Eliminar</p>
					</button>
				)}
				{userId === authorId && (
					<button type='button' className={styles.menu__button}>
						<FaEdit />
						<p>Editar</p>
					</button>
				)}
				{(role === 2 || role === 3) && (
					<button type='button' className={styles.menu__button}>
						<MdReport />
						<p>Reportar</p>
					</button>
				)}
			</div>
		</div>
	);
};

Menu.propTypes = {
	closeMenu: PropTypes.func,
	projectId: PropTypes.number,
	authorId: PropTypes.number,
};
