import { Link } from "react-router-dom"
import styles from './Register.module.scss';

export const Register = () => {
  return (
    <main className={styles.main}>
      <form method="post" className={styles.form} role="form">
        <h3 className={styles.form__title}>Crea una cuenta</h3>
        <input
          type="text"
          name="codigo"
          placeholder="Codigo"
          className={styles.form__input}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className={styles.form__input}
        />
        
        <input type="submit" value="Registrarse" className={styles.form__button}/>
        <p>
          ¿Ya tienes una cuenta? <Link to="/" className={styles.form__link}>Inicia sesion</Link>
        </p>
      </form>
    </main>
  )
}
