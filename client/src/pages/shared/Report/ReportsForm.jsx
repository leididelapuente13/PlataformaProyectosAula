// Styles
import styles from './ReportsForm.module.scss';
// Request
import { createReport } from '../../../api/reportsApi';
// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { SuccessPopUp } from '../../../components/utils/success/SuccessPopUp';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { ValidationError } from '../../../components/utils/validation/ValidationError';
// Dependencies
import BarLoader from 'react-spinners/BarLoader';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

export const ReportsForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const createReportMutation = useMutation(createReport);

	const handleSubmitReport = async (data) => {
		const reportData = {
			data: {
				type: 'report',
				attributes: {
					description: data.description,
					project: data.project,
					plagio: data.plagio,
				},
			},
		};

		try {
			await createReportMutation.mutateAsync(reportData, {
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
			{createReportMutation.isError && (
				<ErrorPopUp message={createReportMutation.error} />
			)}
			{createReportMutation.isSuccess && (
				<SuccessPopUp message='El Reporte Fue Enviado' />
			)}
			<main className={styles.main} onSubmit={handleSubmit(handleSubmitReport)}>
				<Nav />
				<form className={styles.form}>
					<h1 className={styles.form__title}>Haz tu reporte</h1>
					<div>
						<label htmlFor='description' className={styles.form__label}>
							Descrpción del reporte:
						</label>
						<textarea
							id='description'
							rows='10'
							className={styles.form__textarea}
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
						<label
							htmlFor='original'
							className={styles.form__label}
							{...register('project', {
								required: {
									value: true,
									message: 'El Proyecto es requerido',
								},
							})}
						>
							Proyecto Original
						</label>
						<input type='file' name='' id='' className={styles.form__input} />
						{errors.project && (
							<ValidationError message={errors.project.message} />
						)}
					</div>
					<div>
						<label
							htmlFor=''
							className={styles.form__label}
							{...register('plagio', {
								required: {
									value: true,
									message: 'El Proyecto Plagiado es requerido',
								},
							})}
						>
							Plagio
						</label>
						<input type='file' name='' id='' className={styles.form__input} />
						{errors.plagio && (
							<ValidationError message={errors.plagio.message} />
						)}
					</div>
					<button type='submit' className={styles.form__button}>
						Enviar
					</button>
					{createReportMutation.isLoading && (
						<div data-testid='loader-container' className={styles.form__loader}>
							<BarLoader
								color='#0A84F4'
								height={7}
								width={470}
								loading={createReportMutation.isLoading}
							/>
						</div>
					)}
				</form>
			</main>
		</>
	);
};
