//Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Pages
import { LogIn } from './pages/shared/LogIn/LogIn';
import { Register } from './pages/shared/Register/Register';
//React Query client provider
import { QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LogIn />} />
					<Route path='/register' element={<Register />} />
					<Route path='indexAdmin' element={<h1>Admin</h1>} />
					<Route path='indexStudent' element={<h1>Student</h1>} />
					<Route path='indexAdmin' element={<h1>Professor</h1>} />
					<Route path='*' element={<h1>404</h1>} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
