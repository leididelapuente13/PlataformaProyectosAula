import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ role }) => {
	const userToken = Cookies.get('token');
	const userRole = Cookies.get('role');

	if (!userToken) {
		return <Navigate to='/' />;
	} else if (userRole !== role) {
		return <Navigate to='*' />;
	}

	return <Outlet />;
};
