import { PropTypes } from 'prop-types';
import iconError from '../../../assets/img/icons/error.svg';
import styles from './PopUpError.module.scss'

import { useState } from 'react';

export const PopUpError = ({ message = '404' }) => {
    
    const [popUp, setPopUp] = useState(true)

    const handleClosePopUp = () =>{
        setPopUp(false)
    }

	return (
		<div className={popUp ? styles.coverOpacity : styles.coverHidden}>
			<div className={styles.card}>
				<div className={styles.card__circle}>
					<img src={iconError} alt='Icon Error' className={styles.card__icon} />
				</div>
				<p className={styles.card__textBold}>{message}</p>
				<p className={styles.card__textLight}>Ha ocurrido un error, intentalo de nuevo</p>
                <button type="button" className={styles.card__button} onClick={handleClosePopUp}>Aceptar</button>
			</div>
		</div>
	);
};

PopUpError.propTypes = {
	message: PropTypes.string,
};
