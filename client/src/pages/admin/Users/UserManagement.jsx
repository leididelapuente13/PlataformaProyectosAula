// Dependencies
import { useContext } from 'react';
// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav} from '../../../components/layout/nav/StudentNav/Nav';
import { UsersList } from '../../../components/users/usersList/UsersList';
import { ConfirmationPopUp } from '../../../components/utils/confirmation/ConfirmationPopUp';
// Context
import { WarningContext } from '../../../context/WarningContext';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';

export const UserManagement = () => {
	const { visible, setVisible } = useContext(WarningContext);

	return (
		<>
			{/* <Nav /> */}
			<StudentNav/>
			{visible.deactivateUserWarning && <ConfirmationPopUp message="¿Esta seguro de querer desactvar el perfil?" visible={visible} setVisible={setVisible} />}
			{visible.listUsersError && <ErrorPopUp/>}
			<main>
				<UsersList />
			</main>
		</>
	);
};
