import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
//component
import { LogIn } from './LogIn';

/**
 * TODO: Envio del formulario, navegacion hacia el inicio, navegacion hacia el form registrar, manejo de errores de validacion, manejo de errores del servidor, guardar en local storage
 */

describe('Log In Page', () => {
	beforeEach(() => render(<LogIn />));
	test('Should render log in form', () => {
		const loginForm = screen.getByRole('form');
		expect(loginForm).toBeInTheDocument();
	});
	test('Should catch the changes in the inputs', async () => {
		const codeInput = screen.getByLabelText('E-mail');
		const passwordInput = screen.getByLabelText('Contraseña');

		expect(codeInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();

		user.type(codeInput, '123456789');
		user.type(passwordInput, '1234567');

		await waitFor(() => {
			expect(screen.getByDisplayValue('123456789')).toBeInTheDocument();
			expect(screen.getByDisplayValue('1234567')).toBeInTheDocument();
		});
	});
});
