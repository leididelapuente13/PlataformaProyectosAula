// Styles
import styles from './ProjectManagementForm.module.scss';
// Dependencies
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// Request
import { createProjectRequest } from '../../../../api/projectsApi';
// Components
import { Nav } from '../../../../components/layout/nav/StudentNav/Nav';
import BarLoader from 'react-spinners/BarLoader';
import { ValidationError } from '../../../../components/utils/validation/ValidationError';
import { DropZone } from '../../../../components/utils/dropzone/DropZone';
import { useState } from 'react';
import { ErrorPopUp } from '../../../../components/utils/error/ErrorPopUp';
import { SuccessPopUp } from '../../../../components/utils/success/SuccessPopUp';

export const ProjectManagementForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [projectFile, setProjectFile] = useState(null);
	const [projectCover, setProjectCover] = useState(null);

	const onDropProjectFile = (acceptedFiles) => {
		setProjectFile(acceptedFiles[0]);
	};

	const onDropProjectCover = (acceptedFiles) => {
		setProjectCover(acceptedFiles[0]);
	};

	const createProjectMutation = useMutation(createProjectRequest);

	const handleSubmitProject = async (data) => {
		const projectData = {
			data: {
				type: 'post',
				attributes: {
					title: data.title,
					description: data.description,
					cover: projectCover,
					file: projectFile,
				},
			},
		};
		try {
			await createProjectMutation.mutateAsync(projectData, {
				onSuccess: () => {
					reset();
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{createProjectMutation.isError && (
				<ErrorPopUp
					message={createProjectMutation.error.message}
					role='alert'
				/>
			)}
			{createProjectMutation.isSuccess && (
				<SuccessPopUp message='Proyecto creado exitosamente' role='status' />
			)}
			<main className={styles.main}>
				<Nav />
				<form
					className={styles.form}
					role='form'
					onSubmit={handleSubmit(handleSubmitProject)}
				>
					<h1 className={styles.form__title}>Gestionar Proyecto</h1>
					<div>
						<label htmlFor='title' className={styles.form__label}>
							Nombre del proyecto
						</label>
						<input
							className={styles.form__input}
							type='text'
							id='title'
							{...register('title', {
								required: {
									value: true,
									message: 'Este campo es requerido',
								},
							})}
						/>
						{errors.title && <ValidationError message={errors.title.message} />}
					</div>
					<div>
						<label htmlFor='description' className={styles.form__label}>
							Descrpción
						</label>
						<textarea
							className={styles.form__textarea}
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
						<label className={styles.form__label}>
							Archivo en pdf del proyecto
						</label>
						<DropZone onDrop={onDropProjectFile} accept='.pdf' />
						{projectFile && <p>{projectFile.name}</p>}
					</div>
					<div>
						<label className={styles.form__label}>Portada del proyecto</label>
						<DropZone onDrop={onDropProjectCover} accept='image/*' />
						{projectCover && (
							<img
								src={URL.createObjectURL(projectCover)}
								alt='Portada del proyecto'
							/>
						)}
					</div>
					<button type='submit' className={styles.form__button}>
						Enviar
					</button>
					{createProjectMutation.isLoading && (
						<div data-testid='loader-container' className={styles.form__loader}>
							<BarLoader
								color='#0A84F4'
								height={7}
								width={470}
								loading={createProjectMutation.isLoading}
							/>
						</div>
					)}
				</form>
			</main>
		</>
	);
};
