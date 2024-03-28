// Styles
import styles from './SuccessPopUp.module.scss';
// Images
import iconSuccess from '../../../assets/img/icons/success.svg';
// Dependencies
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

export const SuccessPopUp = ({ message }) => {
	const [popUp, setPopUp] = useState(true)

    const handleClosePopUp = () =>{
        setPopUp(false)
    }

	useEffect(() => {
		const main = document.querySelector('main');
		main.classList.add('hiddenBackground');
	}, [])
	

	return (
		<div className={popUp ? styles.transparentBackground : styles.hiddenBackground}>
			<div className={styles.card}>
				<div className={styles.card__circle}>
					<img src={iconSuccess} alt='Icon Error' className={styles.card__icon} />
				</div>
				<p className={styles.card__textBold}>Exito</p>
				<p className={styles.card__textLight}>{message}</p>
                <button type="button" className={styles.card__button} onClick={handleClosePopUp}>Aceptar</button>
			</div>
		</div>
	);
};

SuccessPopUp.propTypes = {
	message: PropTypes.string.isRequired,
};
