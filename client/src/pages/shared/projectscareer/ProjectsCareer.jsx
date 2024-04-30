// Components
import { Nav as AdminNav } from '../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../components/layout/nav/ProfessorNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { NothingToSee } from '../../../components/utils/NothingToSee/NothingToSee';
import PacmanLoader from 'react-spinners/PacmanLoader';
// Dependencies
import { useQuery } from 'react-query';
// Request
import { getCareerProjectsRequest } from '../../../api/careersApi';

export const ProjectsCareer = () => {
	const role = localStorage.getItem('role');

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
		queryKey: ['projects-career'],
		queryFn: getCareerProjectsRequest(),
	});

	return (
		<>
			{isError && (
				<div role='alert'>
					<ErrorPopUp message={error.message} />{' '}
				</div>
			)}
			<main role='main'>
				{role === 1 ? (
					<AdminNav />
				) : role === 2 ? (
					<StudentNav />
				) : role === 3 ? (
					<ProfessorNav />
				) : (
					<StudentNav />
				)}
				<section style={sectionStyles}>
					{isLoading && (
						<div
							style={{ display: 'flex', justifyContent: 'center' }}
							role='progressbar'
						>
							<PacmanLoader
								color='#004D95'
								cssOverride={{ alignSelf: 'center' }}
							/>
						</div>
					)}

					<div role='status'>
						{/* {data.length === 0 && <NothingToSee />} */}
					</div>
					<div>
						{projects.map((project) => (
							<ProjectCard project={project} key={project.id} />
						))}
					</div>
					{
						data > 0 && <div role='article'>
							{data.map((project) => (
								<ProjectCard project={project} key={project.id} />
							))}
						</div>
					}
				</section>
			</main>
		</>
	);
};

const sectionStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '2rem',
	width: '80%',
	margin: '2rem auto',
};
