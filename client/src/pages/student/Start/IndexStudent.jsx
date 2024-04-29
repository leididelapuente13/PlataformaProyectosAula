//Styles
import styles from './IndexStudent.module.scss';
// Dependencies
import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useQuery } from 'react-query';
// Request
import { getProjectsForStudent } from '../../../api/projectsApi';
// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { TrendingIndex } from '../../../components/project/trending/trendingindex/TrendingIndex';

export const IndexStudent = () => {
	const projects = [
		{
			id: 1,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 2,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 3,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 4,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 5,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 6,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 7,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 8,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
	];

	const { isLoading, isError, error, data } = useQuery({
		queryKey: ['projectsInteres'], 
		queryFn: getProjectsForStudent(localStorage.getItem('token')),
	});

	const projectsinterest = projects.slice(0, 10);

	return (
		<>
			{/* {isError && <ErrorPopUp message={error.message}/>} */}
			<main className={styles.main}>
				<Nav />
				<section className={styles.section}>
					<h3 className={styles.section__title}>Anuncios</h3>
				</section>

				<TrendingIndex />

				<section className={styles.section}>
					<h3 className={styles.section__title}>Para ti</h3>
					{/* {isLoading ? (
						<div className={styles.section__loaderContainer}>
							<PacmanLoader
								color='#004D95'
								cssOverride={{ alignSelf: 'center' }}
							/>
						</div>
					) : (
						<>
							{foryou.map((project) => (
								<div>
									<ProjectCard project={project} key={project.id} />
								</div>
							))}
							<Link className={styles.section__link} to="../filter">Ver mas...</Link>
						</>
					)} */}
				</section>
			</main>
		</>
	);
};
