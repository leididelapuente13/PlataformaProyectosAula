//Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Pages
import { LogIn } from './pages/shared/LogIn/LogIn';
import { Register } from './pages/shared/Register/Register';
import { StudentIndex } from './pages/student/indexstudent/StudentIndex';
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
					<Route path='adminIndex' element={<h1>Admin</h1>} />
					<Route path='studentIndex' element={<StudentIndex/>} />
					<Route path='professorIndex' element={<h1>Professor</h1>} />
					<Route path='*' element={<h1>404</h1>} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
