// styles
import styles from './Reports.module.scss';
// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { ReportCard } from '../../../components/reports/ReportCard';
import { CommentSection } from '../../../components/comments/commentsection/CommentSection';

export const Reports = () => {
	const reports = [
		{
			id: '1',
			title: 'Hndnndn',
			description:
				'lorem hdhdhdhdbdbbdbbdbd ejejjejjejej jehehhegevdvd jejjeje',
		},
		{
			id: '2',
			title: 'Hndnndn',
			description:
				'lorem hdhdhdhdbdbbdbbdbd ejejjejjejej jehehhegevdvd jejjeje',
		},
		{
			id: '3',
			title: 'Hndnndn',
			description:
				'lorem hdhdhdhdbdbbdbbdbd ejejjejjejej jehehhegevdvd jejjeje',
		},
		{
			id: '4',
			title: 'Hndnndn',
			description:
				'lorem hdhdhdhdbdbbdbbdbd ejejjejjejej jehehhegevdvd jejjeje',
		},
	];
	return (
		<>
			<main>
				<Nav />
				<section className={styles.section}>
					<h1 className={styles.section__title}>Reportes</h1>
					<article className={styles.article}>
						{reports.map((report) => (
							<ReportCard report={report} key={report.id} />
						))}
					</article>
					<CommentSection/>
				</section>
			</main>
		</>
	);
};
