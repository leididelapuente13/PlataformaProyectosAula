//Styles
import styles from './LogIn.module.scss';
//Dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ValidationError } from '../../../components/utils/validation/ValidationError';
import { PopUpError } from '../../../components/utils/error/PopUpError';
// import { useQuery, useMutation, useQueryClient } from 'react-query';

export const LogIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	// const queryClient = useQueryClient();

	// const {data: user, isLoading} = useQuery({
	// 	queryFn: ()=>fetchUsers(),
	// 	queryKey: ["users"]
	// });

	//se puede usar isError.message y error.message
	// const {mutateAsync: logInMutation, isError, error, data} = useMutation({
	// 	mutationFn: handleLogIn,
	// 	onSuccess: ()=>{
	// 		queryClient.invalidateQueries("users");
	// 	}
	// })

	// const navigate = useNavigate();

	const handleLogIn = async (data) => {
		console.log(data);
		// try {
		// 	const response = await login({ email, password });

		// 	if (response.data.atributes.token !== '') {
		// 		const userRol = response.data.atributes.rol_id;

		// 		localStorage.setItem(
		// 			(userInfo = {
		// 				token: response.data.atributes.token,
		// 				userRol,
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
		// 	console.error('Error: ', error.message);
		// }
		reset();
	};
	return (
		<>
			{/* {isError === true && <PopUpError message={error}/>} */}
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
					<label htmlFor='email' className={styles.form__label}>
						Email
					</label>
					<input
						type='email'
						id='email'
						className={styles.form__input}
						{...register('email', {
							required: {
								value: true,
								message: 'El email es requerido',
							},
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: 'por favor, ingresar un email valido',
							},
						})}
					/>
					{errors.email && <ValidationError message={errors.email.message} />}
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
						})}
					/>
					{errors.password && (
						<ValidationError message={errors.password.message} />
					)}
					{/* {data.code === 401 && <ValidationError message="Correo o contraseña incorrectos" />} */}
					<a className={styles.form__link}>¿Olvidaste tu contraseña?</a>
					<input
						type='submit'
						value='Iniciar Sesion'
						className={styles.form__button}
					/>
					<p>
						¿No tienes cuenta?{' '}
						<Link className={styles.form__linkBlue} to='/register'>
							Registrate
						</Link>
					</p>
				</form>
			</main>
		</>
	);
};
