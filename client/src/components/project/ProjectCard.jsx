// Styles
import styles from './ProjectCard.module.scss';
// Icons
import cover from '../../assets/img/default/projectcover.jpg';
// Dependencies

// Components

export const ProjectCard = () => {
	return (
		<div className={styles.card}>
			<div className={styles__card__imgContainer}>
				<img src={cover} alt='project cover' className={styles.card__img} />
			</div>
			<div className={styles.card__contentContainer}>
				<p className={styles.card__title}>Lorem, ipsum dolor.</p>
                <p className={styles.card__text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolorum
					explicabo ratione. Lorem ipsum dolor sit, amet consectetur adipisicing
					elit. Placeat esse expedita nihil reprehenderit! Doloribus
					voluptatibus possimus at id, laborum, animi saepe pariatur ullam harum
					sed dolor hic excepturi maxime rerum.
                    <Link className={styles.card__link}>Ver mas</Link>
				</p>
			</div>
            <div className={styles.card__buttonContainer}>
                <button type="button" className={styles.card__buttonLike}></button>
                <button type="button" className={styles.card__buttonComment}></button>
            </div>
		</div>
	);
};
