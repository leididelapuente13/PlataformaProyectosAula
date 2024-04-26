// Components
import { ProjectCard } from '../../../projectcard/ProjectCard';
export const TrendingSection = () => {
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
		<div style={{ padding: '2rem' }}>
			{projects.map((project) => (
				<ProjectCard project={project} key={project.id} />
			))}
		</div>
	);
};
