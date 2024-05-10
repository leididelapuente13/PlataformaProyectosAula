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
						{data && data.length === 0 && <NothingToSee />}
					</div>
					{data && data > 0 && (
						<div role='article'>
							{data.data.data.map((project) => (
								<ProjectCard project={project} key={project.id} />
							))}
						</div>
					)}
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
