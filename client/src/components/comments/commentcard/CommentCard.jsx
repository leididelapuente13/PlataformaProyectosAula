import styles from './CommentCard.module.scss';
export const CommentCard = ({ comment }) => {
	return (
		<div className={styles.card}>
			<div className={styles.card__container}>
				<img src='https://i.pravatar.cc/150?u=c' alt='user image' className={styles.card__img}/>
				<p className={styles.card__text__bold}>Autor</p>
			</div>
			<p className={styles.card__text__regular}>{comment.comment}</p>
		</div>
	);
};
