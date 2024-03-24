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
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
