// Styles
import styles from './ProjectDetails.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
import cover from '../../../../assets/img/default/projectcover.jpg';
// Dependencies
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProjectRequest } from '../../../../api/projectsApi';
import { useEffect } from 'react';
// Components
import { Nav as StudentNav } from '../../../../components/layout/nav/StudentNav/Nav';
import { Nav as AdminNav } from '../../../../components/layout/nav/AdminNav/Nav';
import { Nav as ProfessorNav } from '../../../../components/layout/nav/ProfessorNav/Nav';
export const ProjectDetails = () => {
	const project = {
		id: 1,
		title: 'Lorem, ipsum dolor.',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
		likes: 40,
		comments: 50,
	};

	const role = localStorage.getItem('role');

	const { projectId } = useParams();

	// const Project = useQuery({
	// 	queryKey: ['project', { projectId }],
	// 	queryFn: getProjectRequest(projectId),
	// });

	// useEffect(() => {
	// console.log(projectId);
	// 	Project();
	// }, []);
	return (
		<>
			<main>
				{role === 2 ? (
					<StudentNav />
				) : role === 3 ? (
					<ProfessorNav />
				) : role === 1 ? (
					<AdminNav />
				) : (
					''
				)}
				<section className={styles.section}>
					<div className={styles.card}>
						<div className={styles.card__imgContainer}>
							<img
								src={cover}
								alt='project cover'
								className={styles.card__img}
							/>
						</div>
						<div className={styles.card__contentContainer}>
							<p className={styles.card__title}>{project.title}</p>
							<p className={styles.card__text}>{project.description}</p>
							<div>
								<p className={styles.card__text__light}>Autor 1</p>
							</div>
							<div>
								<button
									className={styles.card__button__download}
									onClick={() => {
										window.open(file, '_blank');
									}}
								>
									Archivo del proyecto
								</button>
							</div>
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
					<div className={styles.wrapper}>
						<h3 className={styles.wrapper__title}>Comentarios</h3>
					</div>
				</section>
			</main>
		</>
	);
};
