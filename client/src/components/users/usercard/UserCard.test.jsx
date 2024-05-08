import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
//component
import { UserCard } from './UserCard';
//dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
import { useMutation } from 'react-query';

const queryClient = new QueryClient();

jest.mock('react-query', () => ({
	...jest.requireActual('react-query'),
	useMutation: jest.fn(),
}));

const user = {
	data: {
		id: 123456,
		attributes: {
			user_name: '@user',
			code: 171771717,
			email: 'user@gmail.com',
			description: '',
			role_id: 2,
			state: 1,
		},
	},
};

describe('User card Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Should recieve an object as a prop for the card', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UserCard user={user} />
			</QueryClientProvider>,
		);

		expect(typeof user).toBe('object');
	});

	test('Should render the user data', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UserCard user={user} />
			</QueryClientProvider>,
		);

		expect(screen.getByText('@user')).toBeInTheDocument();
		expect(screen.getByText('171771717')).toBeInTheDocument();
		expect(screen.getByText('user@gmail.com')).toBeInTheDocument();
		expect(screen.getByText('Estudiante')).toBeInTheDocument();
	});

	test('Should call the right mutation depending on the state of the user', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UserCard user={user} />
			</QueryClientProvider>,
		);

		const deactivateUserMutation = jest.fn();
		const activateUserMutation = jest.fn();
		useMutation.mockReturnValueOnce([deactivateUserMutation]);
		useMutation.mockReturnValueOnce([activateUserMutation]);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();

		userEvent.click(button);
		if (user.data.attributes.state === 1) {
			deactivateUserMutation(user.data.id);
			expect(deactivateUserMutation).toHaveBeenCalledWith(user.data.id);
			expect(activateUserMutation).toHaveBeenCalledTimes(0);
		} else {
			activateUserMutation(user.data.id);
			expect(activateUserMutation).toHaveBeenCalledWith(user.data.id);
			expect(deactivateUserMutation).toHaveBeenCalledTimes(0);
		}
	});
});
