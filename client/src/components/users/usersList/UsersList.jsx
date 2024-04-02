import { UserCard } from '../usercard/UserCard';

export const UsersList = () => {
	const user = {
		data: {
			type: 'user',
			id: '123',
			attributes: {
				user_name: 'aaron_13',
				code: '123456789',
				email: 'aaron13@gmail.com',
				role_id: 2,
				description: 'yknlll',
				state: 1,
			},
			links: {
				self: null,
			},
		},
	};
	return (
		<section
			style={{
				width: '100%',
				maxWidth: '500px',
				padding: '1rem',
				margin: 'auto',
			}}
		>
			<h1 style={{ marginBlock: '3rem 1.7rem', color: '#271231' }}>Usuarios</h1>
			<UserCard user={user} />
			<UserCard user={user} />
			<UserCard user={user} />
			<UserCard user={user} />
			<UserCard user={user} />
		</section>
	);
};
