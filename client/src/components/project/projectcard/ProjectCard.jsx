// Styles
import styles from './ProjectCard.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import cover from '../../../assets/img/default/projectcover.jpg';
// Dependencies
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Menu from '../projectmenu/Menu';

export const ProjectCard = ({ project }) => {
	const [menu, setMenu] = useState();

	const closeMenu = () => {
		setMenu(false);
	};
	return (
		<div className={styles.card}>
			<div className={styles.card__imgContainer}>
				<img src={cover} alt='project cover' className={styles.card__img} />
			</div>
			<div>
				<button
					type='button'
					className={styles.card__buttonMenu}
					onClick={() => setMenu(true)}
				>
					<CiMenuKebab />
				</button>
				{menu && <Menu closeMenu={closeMenu} projectId={project.id} />}
			</div>
			<div className={styles.card__contentContainer}>
				<p className={styles.card__title}>{project.title}</p>
				<p className={styles.card__text}>
					{project.description.slice(0, 110)}...
					<Link
						to={`../project-details/${project.id}`}
						className={styles.card__link}
					>
						ver mas
					</Link>
				</p>
			</div>
			<div className={styles.card__buttonContainer}>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonLike}>
						<FaHeart />
					</button>
					<p className={styles.card__text__light}>{project.likes}</p>
				</div>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonComment}>
						<FaCommentAlt />
					</button>
					<p className={styles.card__text__light}>{project.comments}</p>
				</div>
			</div>
		</div>
	);
};

ProjectCard.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.number,
		// cover: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		likes: PropTypes.number,
		comments: PropTypes.number,
	}),
};
