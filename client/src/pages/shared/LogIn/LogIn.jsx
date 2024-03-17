//Styles
import styles from './LogIn.module.scss';
//Dependencies
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "../../api/apiSlice";
import { useForm } from 'react-hook-form';
import { ValidationError } from '../../../components/utils/validation/ValidationError';

export const LogIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	// const [login] = useLoginUserMutation();

	// const navigate = useNavigate();

	const handleLogIn = async (data) => {
		console.log(data);
		reset();
		// try {
		// 	const response = await login({ email, password });
		// 	if (response.data.token) {
		// 		const userRol = response.data.data.rol_id;
		// 		dispatch(
		// 			loginSuccess({
		// 				user: response.data.data,
		// 				token: response.data.token,
		// 			}),
		// 		);
		// 		console.log(response);
		// 		if (userRol === 1) {
		// 			navigate('/indexAdmin');
		// 		} else if (userRol === 2) {
		// 			navigate('/indexStudents');
		// 		} else if (userRol === 3) {
		// 			navigate('/indexProfessors');
		// 		}
		// 	} else {
		// 		console.error('Error al iniciar sesion', response.data.error);
		// 	}
		// } catch (error) {
		// 	console.log('Enviar');
		// 	console.error('Error: ', error);
		// }
	};
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
			<form
				className={styles.form}
				role='form'
				onSubmit={handleSubmit(handleLogIn)}
			>
				<h3 className={styles.form__title}>Inicia Sesion</h3>
				<label htmlFor='code' className={styles.form__label}>
					Codigo
				</label>
				<input
					type='text'
					id='code'
					className={styles.form__input}
					{...register('userCode', {
						required: {
							value: true,
							message: 'El codigo es requerido',
						},
					})}
				/>
				{errors.userCode && (
					<ValidationError message={errors.userCode.message} />
				)}
				<label htmlFor='password' className={styles.form__label}>
					Contraseña
				</label>
				<input
					type='password'
					id='password'
					className={styles.form__input}
					{...register('password', {
						required: {
							value: true,
							message: 'La contraseña es requerida',
						},
						minLength: {
							value: 8,
							message: 'La contraseña debe tener al menos 8 digitos',
						},
					})}
				/>
				{errors.password && (
					<ValidationError message={errors.password.message} />
				)}
				<a className={styles.form__link}>¿Olvidaste tu contraseña?</a>
				<input
					type='submit'
					value='Iniciar Sesion'
					className={styles.form__button}
				/>
				<p>
					¿No tienes cuenta?
					<a className={styles.form__linkBlue}>Registrate</a>
				</p>
			</form>
		</main>
	);
};
