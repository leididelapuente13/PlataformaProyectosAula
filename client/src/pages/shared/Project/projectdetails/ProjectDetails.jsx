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
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
// Components
import { Nav as StudentNav } from '../../../../components/layout/nav/StudentNav/Nav';
import { Nav as AdminNav } from '../../../../components/layout/nav/AdminNav/Nav';
import { Nav as ProfessorNav } from '../../../../components/layout/nav/ProfessorNav/Nav';
import { ErrorPopUp } from '../../../../components/utils/error/ErrorPopUp';

export const ProjectDetails = () => {
	const [user, setUser] = useState({});

	const project = {
		id: 1,
		title: 'Lorem, ipsum dolor.',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
		likes: 40,
		comments: 50,
	};

	const role = parseInt(localStorage.getItem('role'));

	const { projectId } = useParams();

	const { data, isError, error } = useQuery(
		['project', projectId],
		() => getProjectRequest(projectId),
		{
			onSuccess: (data) => {
				setUser(data.data.data.relationships.file.links.related);
				getFiles(user);
				getFiles(
					'https://38ee-181-143-211-148.ngrok-free.app/api/post/files/5',
				);
			},
		},
	);

	const postData = {
		title: data.data.data.attributes.title,
		description: data.data.data.attributes.description,
		publicationDate: moment(data.data.data.attributes.created_at).fromNow(),
	};

	const getFiles = async (url) => {
		try {
			const fileResponse = await axios.get(url, {
				headers: {
					'ngrok-skip-browser-warning': true,
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			console.log(fileResponse);
			return fileResponse;
		} catch (error) {
			console.error('Error al obtener los archivos:', error);
			throw error;
		}
	};

	return (
		<>
			{isError && <ErrorPopUp message={error.message} />}
			<main>
				{role === 1 && <AdminNav />}
				{role === 2 && <StudentNav />}
				{role === 3 && <ProfessorNav />}
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
							<p className={styles.card__title}>{postData.title}</p>
							<p className={styles.card__text}>{postData.description}</p>
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
							<p>{postData.publicationDate}</p>
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
