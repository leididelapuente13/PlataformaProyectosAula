// Styles
import styles from './UsersList.module.scss';
// Icons
import { FaMagnifyingGlass } from 'react-icons/fa6';
// Dependencies
import { isError, useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContext, useEffect } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';
//Component
import { UserCard } from '../usercard/UserCard';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';
// Request
import { getUsers } from '../../../api/usersApi';

export const UsersList = () => {
	// const response = useQuery({ queryKey: ['users'], queryFn: getUsers() });
	const { setVisible, visible } = useContext(WarningContext);

	const response = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	useEffect(() => {
		if (response.isError || response.isSuccess) {
			setVisible((prevVisibility) => ({
				...prevVisibility,
				listUsersError: isError,
			}));
		}
	}, [response.isError, response.isSuccess]);

	const users = [
		{
			data: {
				id: 123,
				attributes: {
					email: 'lelelel',
					code: 'jdjdjjdj',
					description: 'eeiieiei',
					state: 1,
					role_id: 1,
				},
			},
		},
		{
			data: {
				id: 123,
				attributes: {
					email: 'lelelel',
					code: 'jdjdjjdj',
					description: 'eeiieiei',
					state: 1,
					role_id: 1,
				},
			},
		},
		{
			data: {
				id: 123,
				attributes: {
					email: 'lelelel',
					code: 'jdjdjjdj',
					description: 'eeiieiei',
					state: 1,
					role_id: 1,
				},
			},
		},
	];

	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>Usuarios</h1>
			<div className={styles.section__filter}>
				<form className={styles.form}>
					<input type='text' name='filter' className={styles.form__input} />
					<button type='submit' className={styles.form__button}>
						<FaMagnifyingGlass/>
					</button>
				</form>
			</div>
			{response.data && response.data.length === 0 && <NothingToSee />}
			{response.isLoading && (
				<div className={styles.section__loader}>
					<ClipLoader
						loading={response.isLoading}
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			)}

			{/* {response.data &&
				response.data.map((user) => (
					<UserCard user={user} key={user.data.id} />
				))} */}
			{users &&
				users.map((user) => <UserCard user={user} key={user.data.id} />)}
		</section>
	);
};
