// Styles
import styles from './Filter.module.scss';
// Icons
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import robotImg from '../../../../assets/img/icons/robot.png';
// Request

// Components
import { Nav as AdmiNav } from '../../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../../components/layout/nav/ProfessorNav/Nav';
import { MainProjectsSection } from '../../../../components/project/filtersections/projects/main/MainProjectsSection';
// Dependencies
import { useState } from 'react';

export const Filter = () => {
	const role = localStorage.getItem('role');
	const [section, setSection] = useState({
		projects: true,
		groups: false,
		careers: false,
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
				<section className={styles.section}>
					<h2 className={styles.section__title}>Buscador</h2>
					<form className={styles.form}>
						<div className={styles.form__container}>
							<input
								type='text'
								name='buscar'
								placeholder='Buscar Proyecto'
								className={styles.form__input}
							/>
							<button type='submit' className={styles.form__button}>
								<PiMagnifyingGlassFill />
							</button>
						</div>
					</form>
					<div className={styles.section__wrapper}>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('projects')}
						>
							Proyectos
						</button>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('groups')}
						>
							Grupos
						</button>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('careers')}
						>
							Carreras
						</button>
					</div>
					<div className={styles.section__imgContainer}>
						<img
							src={robotImg}
							alt='robot image'
							className={styles.section__img}
						/>
					</div>
				</section>
				<>
					{section.projects && <MainProjectsSection />}
					{section.groups && <h3>Groups</h3>}
					{section.careers && <h3>Careers</h3>}
				</>
			</main>
		</>
	);
};
