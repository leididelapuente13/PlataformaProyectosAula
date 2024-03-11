//Styles
import styles from "./LogIn.module.scss";

//Dependencies
import { Link, useNavigate } from "react-router-dom";
// import { loginSuccess} from "../../features/users/userSlice";
// import { useLoginUserMutation } from "../../api/apiSlice";
// import { useDispatch } from "react-redux";
import { useState } from "react";


export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const [login] = useLoginUserMutation();

  // const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await login({ email, password });
  //     if (response.data.token) {
  //       const userRol = response.data.data.rol_id;
  //       dispatch(
  //         loginSuccess({
  //           user: response.data.data,
  //           token: response.data.token,
  //         })
  //       );
  //       console.log(response)
  //       if (userRol === 1) {
  //         navigate('/indexAdmin');
  //       } else if (userRol === 2) {
  //         navigate('/indexStudents');
  //       } else if (userRol === 3) {
  //         navigate('/indexProfessors');
  //       }
  //     } else {
  //       console.error("Error al iniciar sesion", response.data.error);
  //     }
  //   } catch (error) {
  //   console.log("Enviar")
  //     console.error("Error: ", error);
  //   }
  // };
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.container__title}>¡Bienvenido otra vez!</h2>
        <p className={styles.container__text}>
          Estamos encantados de tenerte de regreso. Por favor, inicia sesión
          para acceder a tu cuenta y continuar explorando todo lo que tenemos
          para ofrecerte.
        </p>
      </div>
      <form className={styles.form}>
        <h3 className={styles.form__title}>Inicia Sesion</h3>
        <label htmlFor="email" className={styles.form__label}>
          Email
        </label>
        <input type="text" name="userCode" id="email" className={styles.form__input} value={email}
          required onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="contrasenia" className={styles.form__label}>
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="contrasenia"
          className={styles.form__input}
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          required
        />
        <a className={styles.form__link}>
          ¿Olvidaste tu contraseña?
        </a>
        <input type="submit" value="Iniciar Sesion" className={styles.form__button} />
        <p>
          ¿No tienes cuenta?
          <a className={styles.form__linkBlue}>
            Registrate
          </a>
        </p>
      </form>
    </main>
  );
};