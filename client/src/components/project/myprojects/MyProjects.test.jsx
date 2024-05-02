import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
//component
import { MyProjects } from './MyProjects';
//dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const queryClient = new QueryClient();

const getMyProjectsQuery = jest.fn();

describe('My Projects Section Tests', () => {
	test('Should render the component', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<MyProjects />
			</QueryClientProvider>,
		);
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should render the loading component when the query is loading', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<MyProjects />
			</QueryClientProvider>,
		);

		getMyProjectsQuery.mockReturnValue({ isLoading: true });

		expect(
			screen.getByRole('progressbar', { hidden: true }),
		).toBeInTheDocument();
	});

	test('Should render component nothing to see when the data length is equals to zero', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<MyProjects />
			</QueryClientProvider>,
		);

		getMyProjectsQuery.mockReturnValue({ data: [].length });

		if (getMyProjectsQuery.data === 0) {
			expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
		}
	});
});
