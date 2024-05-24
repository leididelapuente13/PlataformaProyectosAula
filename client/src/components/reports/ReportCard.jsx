import styles from './ReportCard.module.scss';
import PropTypes from 'prop-types';

export const ReportCard = ({ report }) => {
	return (
		<div className={styles.card}>
			<p className={styles.card__text__bold}>{report.title}</p>
			<p className={styles.card__text__regular}>{report.description}</p>
            <p className={styles.card__text__light}>autor</p>
            <button
				className={styles.card__button}
				onClick={() => {
					window.open('', '_blank');
				}}
			>
				Archivo del proyecto
			</button>
		</div>
	);
};

ReportCard.propTypes = {
	report: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		file: PropTypes.string,
	}),
};
