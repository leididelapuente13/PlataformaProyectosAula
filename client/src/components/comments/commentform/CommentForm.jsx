// Styles
import styles from './CommentForm.module.scss'
export const CommentForm = () => {
  return (
    <form className={styles.form}>
        <textarea cols="30" rows="10" className={styles.form__textarea} placeholder='Deja tu comentario'></textarea>
        <hr className={styles.form__separator}/>
        <button type="submit" className={styles.form__button}>Comentar</button>
    </form>
  )
}
