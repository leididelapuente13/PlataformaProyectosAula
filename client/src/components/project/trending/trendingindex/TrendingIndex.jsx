//Styles
import styles from './TrendingIndex.module.scss';
// Dependencies
import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useQuery } from 'react-query';
// Request
import { getTrendingProjectsRequest } from '../../../../api/projectsApi';
// Components
import { ProjectCard } from '../../../../components/project/projectcard/ProjectCard';
import Number from '../../../../components/project/trendnumber/Number';
import { NothingToSee } from '../../../utils/NothingToSee/NothingToSee';

export const TrendingIndex = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['trending-projects'],
		queryFn: getTrendingProjectsRequest,
	});

	const trends = data ? data.slice(0, 3) : [];

	return (
		<section className={styles.section}>
			<h3 className={styles.section__title}>Top Tendencias</h3>
			{trends.length === 0 && <NothingToSee />}
			{isLoading && (
				<div className={styles.section__loaderContainer} role='progressbar'>
					<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}
			{trends.length > 0 && (
				<div className='trending-project'>
					{trends.map((project) => (
						<div>
							<Number trendNumber={trend.indexOf(project) + 1} />
							<ProjectCard project={project} key={project.id} />
						</div>
					))}
					<div>
						<Link className={styles.section__link} to='../filter' role='link'>
							Ver mas...
						</Link>
					</div>
				</div>
			)}
		</section>
	);
};
