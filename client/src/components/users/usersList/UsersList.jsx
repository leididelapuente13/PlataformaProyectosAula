// Dependencies
import { isError, useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContext, useEffect } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';
//Component
import { UserCard } from '../usercard/UserCard';
// Request
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';

export const UsersList = () => {
	// const response = useQuery({ queryKey: ['users'], queryFn: getUsers() });
	const { setVisible, visible } = useContext(WarningContext);
	const response = useQuery({
		queryKey: ['users'],
	});

	useEffect(() => {
		if (response.isError || response.isSuccess) {
			setVisible((prevVisibility) => ({
				...prevVisibility,
				listUsersError: isError,
			}));
		}
	}, [response.isError, response.isSuccess]);

	return (
		<section
			style={{
				width: '100%',
				maxWidth: '500px',
				padding: '1rem',
				margin: 'auto',
			}}
		>
			<h1 style={{ marginBlock: '6rem 1.7rem', color: '#' }}>Usuarios</h1>
			{response.data && response.data.length === 0 && <NothingToSee />}
			{response.isLoading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '40%',
					}}
				>
					<ClipLoader
						loading={response.isLoading}
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			)}

			{response.data && response.data.map((user) => (
				<UserCard user={user} key={user.data.id} />
			))}
		</section>
	);
};
