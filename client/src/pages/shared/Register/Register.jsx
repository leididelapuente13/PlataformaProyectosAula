import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import { ValidationError } from '../../../components/utils/validation/ValidationError';
import { useForm } from 'react-hook-form';

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleRegister = (data) => {
    console.log(data)
		reset();
	};

	return (
		<main className={styles.main}>
			<form
				method='post'
				className={styles.form}
				role='form'
				onSubmit={handleSubmit(handleRegister)}
			>
				<h3 className={styles.form__title}>Crea una cuenta</h3>
				<div>
					<input
						type='text'
						placeholder='Codigo'
						className={styles.form__input}
						{...register('code', {
							required: {
								value: true,
								message: 'Ingrese el codigo para crear el perfil',
							},
						})}
					/>
					{errors.code && <ValidationError message={errors.code.message} />}
				</div>
				<div>
					<input
						type='password'
						placeholder='Contraseña'
						className={styles.form__input}
						{...register('password', {
							required: {
								value: true,
								message: 'Ingrese la contraseña para crear el perfil',
							},
							minLength: {
								value: 8,
								message: 'La contraseña debe tener al menos 8 digitos',
							},
              maxLength: {
								value: 16,
								message: 'La contraseña debe tener menos de 16 digitos',
							},
						})}
					/>
					{errors.password && (
						<ValidationError message={errors.password.message} />
					)}
				</div>
				<input
					type='submit'
					value='Registrarse'
					className={styles.form__button}
				/>
				<p>
					¿Ya tienes una cuenta?{' '}
					<Link to='/' className={styles.form__link}>
						Inicia sesion
					</Link>
				</p>
			</form>
		</main>
	);
};
