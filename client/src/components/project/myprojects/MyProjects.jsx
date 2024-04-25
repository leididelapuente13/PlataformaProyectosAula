// Styles
import styles from './MyProjects.module.scss';
// Request
import { getMyProjects } from '../../../api/profileApi';
// Dependencies
import PropTypes from 'prop-types';
// Components
import { ProjectCard } from '../projectcard/ProjectCard';
import { useQuery } from 'react-query';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';
import { ConfirmationPopUp } from '../../utils/confirmation/ConfirmationPopUp';

export const MyProjects = ({ userId }) => {
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

	const Projects = useQuery({
		queryKey: ['projects', { userId }],
		queryFn: getMyProjects,
	});

	return (
		<>
			{/* {Projects.isLoading && (
				<div className={styles.loaderContainer}>
					<PacmanLoader color='#0A84F4' cssOverride={{ alignSelf: 'center' }}/>
				</div>
			)} */}
			<section className={styles.section}>
				{/* {Projects && Projects.data.length === 0 && <NothingToSee />} */}
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</section>
		</>
	);
};

MyProjects.propTypes = {
	userId: PropTypes.number,
};
