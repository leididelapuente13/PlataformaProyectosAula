// Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//Pages
import { LogIn } from './pages/public/LogIn/LogIn';
import { Register } from './pages/public/Register/Register';
import { Profile } from './pages/student/Profile/Profile';
import { ProjectManagementForm } from './pages/student/Project/projectmanagementform/ProjectManagementForm';
import { ProjectDetails } from './pages/shared/Project/projectdetails/ProjectDetails';
import { UserManagement } from './pages/admin/Users/UserManagement';
import { IndexStudent } from './pages/student/Start/IndexStudent';
import { IndexProfessor } from './pages/professor/Start/IndexProfessor';
import { Filter } from './pages/shared/Project/Filter/Filter';
// Components
import { ProtectedRoute } from './routes/ProtectedRoute';
import { WarningContextProvider } from './context/WarningContext';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<WarningContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<LogIn />} />
						<Route path='/register' element={<Register />} />
						<Route path='/indexStudent' element={<IndexStudent />} />
						<Route element={<ProtectedRoute role='1' />}>
							<Route path='/user-management' element={<UserManagement />} />
							<Route path='/reports' element={<h1>Admin</h1>} />
							<Route path='/report-details' element={<h1>Admin</h1>} />
							<Route path='/announcements' element={<h1>Admin</h1>} />
						</Route>
						<Route element={<ProtectedRoute role='2' />}>
							{/* <Route path='/indexStudent' element={<h1>Index Student</h1>} /> */}
							<Route path='/project-form' element={<ProjectManagementForm />} />
						</Route>
						<Route element={<ProtectedRoute role='3' />}>
							{/* <Route path='/indexProfessor' element={<IndexProfessor />} /> */}
						</Route>
						<Route path='/indexProfessor' element={<IndexProfessor />} />
						<Route path='/filter' element={<Filter />} />
						<Route path='/report' element={<h1>Report</h1>} />
						<Route
							path='/project-details/:projectId'
							element={<ProjectDetails />}
						/>
						<Route
							path='/project-details/:projectId'
							element={<ProjectDetails />}
						/>
						<Route path='/profile' element={<Profile />} />
						<Route path='*' element={<h1>404</h1>} />
					</Routes>
				</BrowserRouter>
			</WarningContextProvider>
		</QueryClientProvider>
	);
}

export default App;
