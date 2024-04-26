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
// Dependencies

export const Filter = () => {
	const role = localStorage.getItem('role');
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
						<button type='button' className={styles.section__button}>
							Proyectos
						</button>
						<button type='button' className={styles.section__button}>
							Grupos
						</button>
						<button type='button' className={styles.section__button}>
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
			</main>
		</>
	);
};
