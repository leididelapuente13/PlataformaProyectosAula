// Components
import { useContext, useEffect } from 'react';
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { UsersList } from '../../../components/users/usersList/UsersList';
import { ConfirmationPopUp } from '../../../components/utils/confirmation/ConfirmationPopUp';
import { WarningContext } from '../../../context/WarningContext';

export const UserManagement = () => {
	const { visible, setVisible } = useContext(WarningContext);

	useEffect(() => {
	  console.log(visible)
	}, [visible])
	

	return (
		<>
			<Nav />
			{visible.deactivateUserWarning && <ConfirmationPopUp message="djdjd" visible={visible} setVisible={setVisible} />}
			<main>
				<UsersList />
			</main>
		</>
	);
};
