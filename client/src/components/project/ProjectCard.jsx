// Styles
import styles from './ProjectCard.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
import cover from '../../assets/img/default/projectcover.jpg';
// Dependencies
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProjectCard = () => {
	const texto =
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, ducimus?';

	return (
		<div className={styles.card}>
			<div className={styles.card__imgContainer}>
				<img src={cover} alt='project cover' className={styles.card__img} />
			</div>
			<div className={styles.card__contentContainer}>
				<p className={styles.card__title}>Lorem, ipsum dolor.</p>
				<p className={styles.card__text}>
					{texto.slice(0, 110)}...
					<Link className={styles.card__link}>ver mas</Link>
				</p>
			</div>
			<div className={styles.card__buttonContainer}>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonLike}>
						<FaHeart />
					</button>
					<p className={styles.card__text__light}>30</p>
				</div>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonComment}>
						<FaCommentAlt />
					</button>
					<p className={styles.card__text__light}>5</p>
				</div>
			</div>
		</div>
	);
};

ProjectCard.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.number,
		cover: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		likes: PropTypes.number,
		comments: PropTypes.number,
	}),
};
