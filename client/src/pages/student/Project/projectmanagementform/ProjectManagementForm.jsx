// Styles
import styles from './ProjectManagementForm.module.scss';
// Dependencies
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// Request
// Components
import BarLoader from 'react-spinners/BarLoader';
import { ValidationError } from '../../../../components/utils/validation/ValidationError';

export const ProjectManagementForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	return (
		<form>
			<h1>Gestionar Proyecto</h1>
			<div>
				<label htmlFor='name'>Nombre del proyecto</label>
				<input
					type='text'
					id='name'
					{...register('name', {
						required: {
							value: true,
							message: 'Este campo es requerido',
						},
					})}
				/>
				{errors.name && <ValidationError message={errors.message.name} />}
			</div>
			<div>
				<label htmlFor='description'>Descrpción</label>
				<textarea
					id='description'
					cols='30'
					rows='10'
					{...register('description', {
						required: {
							value: true,
							message: 'La descrpción es requerida',
						},
					})}
				></textarea>
				{errors.description && (
					<ValidationError message={errors.description.message} />
				)}
			</div>
			<div>
				<label htmlFor='project'>Proyecto</label>
				<input
					type='file'
					id='project'
					{...register('file', {
						required: {
							value: true,
							message: 'Por favor subir el archivo del proyecto',
						},
					})}
				/>
				{errors.file && <ValidationError message={errors.file.message}/>}
			</div>
			<button type='submit'>Enviar</button>
		</form>
	);
};
