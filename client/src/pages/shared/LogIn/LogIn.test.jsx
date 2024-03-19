import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
//component
import { LogIn } from './LogIn';
import { BrowserRouter } from 'react-router-dom';
/**
 * TODO: Envio del formulario, navegacion hacia el inicio, navegacion hacia el form registrar, manejo de errores de validacion, manejo de errores del servidor, guardar en local storage
*/

describe('Log In Page', () => {
	beforeEach(() =>
		render(
			<BrowserRouter>
					<LogIn />
			</BrowserRouter>,
		),
	);

	test('Should render log in form', () => {
		const loginForm = screen.getByRole('form');
		expect(loginForm).toBeInTheDocument();
	});

	test('Should catch the changes in the inputs', async () => {
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Contraseña');

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();

		userEvent.type(emailInput, 'test@example.com');
		userEvent.type(passwordInput, '1234567');

		const button = screen.getByRole('button', { name: /Iniciar Sesion/i });

		expect(button).toBeInTheDocument();

		userEvent.click(button);
	});
});
