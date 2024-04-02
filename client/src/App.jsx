//Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Pages
import { LogIn } from './pages/public/LogIn/LogIn';
import { Register } from './pages/public/Register/Register';
import { StudentIndex } from './pages/student/indexstudent/StudentIndex';
//React Query client provider
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProtectedRoute } from './routes/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LogIn />} />
					<Route path='/register' element={<Register />} />
					<Route path='indexStudent' element={<h1>Student</h1>} />
					<Route element={<ProtectedRoute role='1' />}>
						<Route path='/indexAdmin' element={<h1>Admin</h1>} />
						<Route path='/users' element={<h1>Admin</h1>} />
						<Route path='/reports' element={<h1>Admin</h1>} />
						<Route path='/announcements' element={<h1>Admin</h1>} />
					</Route>
					<Route element={<ProtectedRoute role='2' />}>
						<Route path='/indexStudent' element={<h1>Index Student</h1>} />
						<Route path='/profile' element={<h1>Profile</h1>} />
						<Route path='/form-project' element={<h1>Profile</h1>} />
					</Route>
					<Route element={<ProtectedRoute role='3' />}>
						<Route path='/indexProfessor' element={<h1>Professor</h1>} />
					</Route>
					<Route path='filter' element={<h1>Filter</h1>} />
					<Route path='report' element={<h1>Report</h1>} />
					<Route path='/project-details' element={<h1>Profile</h1>} />
					<Route path='*' element={<h1>404</h1>} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
