// Styles
import styles from './UserCard.module.scss';
// Default image
import icon from '../../../assets/img/default/icon.png';
// Dependencies
import { PropTypes } from 'prop-types';
import { useContext } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';

export const UserCard = ({ user }) => {
	const userData = {
		id: user.data.id,
		user_name: user.data.attributes.user_name,
		code: user.data.attributes.code,
		email: user.data.attributes.email,
		description: user.data.attributes.description,
		role: user.data.attributes.role_id,
		state: user.data.attributes.state,
	};

	const { setVisible } = useContext(WarningContext);

	const setConfirmation = () => {
		setVisible((prevVisible) => ({
			...prevVisible,
			deactivateUserWarning: true,
		}));
	};

	return (
		<>
			<div className={styles.card}>
				<img
					src={icon}
					alt='user icon'
					role='img'
					className={styles.card__img}
				/>
				<div className={styles.card__container}>
					<p className={styles.card__textBold}>{userData.user_name}</p>
					<p className={styles.card__textBold}>
						{userData.role === 2
							? 'Estudiante'
							: userData.role === 3
								? 'Profesor'
								: ''}
					</p>
					<p className={styles.card__textLight}>{userData.code}</p>
					<p className={styles.card__textLight}>{userData.email}</p>
				</div>
			</div>
			<button
				type='button'
				className={
					userData.state === 1 ? styles.buttonDeactivate : styles.buttonActivate
				}
				onClick={setConfirmation}
			>
				{userData.state === 1 ? 'Desactivar' : 'Activar'}
			</button>
			<hr className={styles.card__hr} />
		</>
	);
};

UserCard.propTypes = {
	user: PropTypes.shape({
		data: PropTypes.shape({
			id: PropTypes.number,
			attributes: PropTypes.shape({
				email: PropTypes.string.isRequired,
				code: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				state: PropTypes.number.isRequired,
				role_id: PropTypes.number.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};
