//Styles
import styles from './LogIn.module.scss';
//Dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ValidationError } from '../../../components/utils/validation/ValidationError';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { useMutation } from 'react-query';
import { loginRequest } from '../../../api/authApi';
import BarLoader from 'react-spinners/BarLoader';

export const LogIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const navigate = useNavigate();

	const loginMutation = useMutation(loginRequest);

	const handleLogIn = async (data) => {
		const userData = {
			data: {
				type: 'user',
				attributes: {
					email: data.email,
					password: data.password,
				},
			},
		};
		try {
			await loginMutation.mutateAsync(userData, {
				onSuccess: (mutationResult) => {
					reset();
					console.log('Datos', mutationResult.data);
					const role = mutationResult.data.attributes.role_id;
					console.log(role);
					if (role === 1) {
						navigate('/indexAdmin');
					} else if (role === 2) {
						navigate('/indexStudent');
					} else if (role === 3) {
						navigate('./indexProfessor');
					}
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{loginMutation.isError && (
				<ErrorPopUp message={loginMutation.error.message} role='alert' />
			)}
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
						type='text'
						id='email'
						className={styles.form__input}
						{...register('email', {
							required: {
								value: true,
								message: 'Ingrese el email para continuar',
							},
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: 'Por favor, ingresar un email valido',
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
								message: 'Ingrese la contraseña para continuar',
							},
						})}
					/>
					{errors.password && (
						<ValidationError message={errors.password.message} />
					)}
					{/* {loginMutation.error.message.includes('401') && <ValidationError message='Correo o contraseña incorrectos' />} */}
					<a className={styles.form__link}>¿Olvidaste tu contraseña?</a>
					<input
						type='submit'
						value='Iniciar Sesion'
						className={styles.form__button}
						role='button'
					/>
					<p>
						¿No tienes cuenta?{' '}
						<Link className={styles.form__linkBlue} to='/register' role='link'>
							Registrate
						</Link>
					</p>
					<div data-testid='loader-container'>
						<BarLoader
							color='#0A84F4'
							height={5}
							loading={loginMutation.isLoading}
						/>
					</div>
				</form>
			</main>
		</>
	);
};
