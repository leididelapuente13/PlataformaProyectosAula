// Components
import { Nav as AdminNav } from '../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../components/layout/nav/ProfessorNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
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

	return (
		<>
			<main>
				{role === 1 ? (
					<AdmiNav />
				) : role === 2 ? (
					<StudentNav />
				) : role === 3 ? (
					<ProfessorNav />
				) : (
					<StudentNav />
				)}
				<section style={sectionStyles}>
					{projects.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
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
