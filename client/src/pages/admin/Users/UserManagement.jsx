// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { UsersList } from '../../../components/users/usersList/UsersList';

export const UserManagement = () => {
	return (
		<>
			<Nav />
			<main>
				<UsersList />
			</main>
		</>
	);
};
