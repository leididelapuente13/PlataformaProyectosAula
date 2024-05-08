// Styles
import styles from './ProjectCard.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
// Dependencies
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Menu } from '../projectmenu/Menu';
import { useQuery } from 'react-query';
import { getFile } from '../../../api/projectsApi';
import GridLoader from 'react-spinners/GridLoader';

export const ProjectCard = ({ project }) => {
	const projectData = {
		id: project.id,
		title: project.attributes.title,
		description: project.attributes.description,
		files: project.relationships.file.links.related,
	};

	const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

	const { isLoading, data } = useQuery(['projectFile', projectData.id], () =>
		getFile(projectData.files),
	);
	console.log(data);

	const [menu, setMenu] = useState();

	const closeMenu = () => {
		setMenu(false);
	};
	return (
		<div className={styles.card}>
			<div className={styles.card__imgContainer}>
				{isLoading && (
					<div className={styles.loaderContainer} role='progressbar'>
						<GridLoader color='#0A84F4' />
					</div>
				)}
				{data !== undefined && (
					<img
						src={data !== undefined && `${baseUrl}${data[0].links.file}`}
						alt='project cover'
						className={styles.card__img}
					/>
				)}
			</div>
			<div>
				<button
					type='button'
					className={styles.card__buttonMenu}
					onClick={() => setMenu(true)}
				>
					<CiMenuKebab />
				</button>
				{menu && (
					<Menu
						closeMenu={closeMenu}
						projectId={project.id}
						// projectOwner={project.owner}
					/>
				)}
			</div>
			<div className={styles.card__contentContainer}>
				<p className={styles.card__title}>{projectData.title}</p>
				<p className={styles.card__text}>
					{projectData.description.slice(0, 110)}...
					<Link
						to={`../project-details/${projectData.id}`}
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
					{/* <p className={styles.card__text__light}>{project.likes}</p> */}
				</div>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonComment}>
						<FaCommentAlt />
					</button>
					{/* <p className={styles.card__text__light}>{project.comments}</p> */}
				</div>
			</div>
		</div>
	);
};

ProjectCard.propTypes = {
	project: PropTypes.shape({
		// id: PropTypes.number,
		// // cover: PropTypes.string,
		// title: PropTypes.string,
		// description: PropTypes.string,
		// likes: PropTypes.number,
		// comments: PropTypes.number,
	}),
};
