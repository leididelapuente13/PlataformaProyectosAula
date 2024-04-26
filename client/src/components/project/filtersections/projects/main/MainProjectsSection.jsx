// Styles
import { useState } from 'react';
import styles from './MainProjectsSection.module.scss';
// Components
// Dependencies

export const MainProjectsSection = () => {
	const [section, setSection] = useState({
		trending: true,
		foryou: false,
		all: false,
	});

	const handleSetSection = (toUpdateSection) => {
		const sectionsNewState = {
			projects: false,
			groups: false,
			careers: false,
		};

		sectionsNewState[toUpdateSection] = true;

		setSection(sectionsNewState);
	};
	return (
		<section className={styles.section}>
			<div className={styles.section__buttonContainer}>
				<button
					type='button'
					onClick={() => handleSetSection('trending')}
					className={
						section.trending
							? styles.section__buttonActive
							: styles.section__button
					}
				>
					Tendencias
				</button>
				<button
					onClick={() => handleSetSection('foryou')}
					type='button'
					className={
						section.foryou
							? styles.section__buttonActive
							: styles.section__button
					}
				>
					Para ti
				</button>
				<button
					onClick={() => handleSetSection('all')}
					type='button'
					className={
						section.all ? styles.section__buttonActive : styles.section__button
					}
				>
					Todos
				</button>
			</div>
			<>
                {section.trending && <h2>Tendencias</h2>}
                {section.foryou && <h2>For You</h2>}
                {section.all && <h2>All</h2>}
            </>
		</section>
	);
};
