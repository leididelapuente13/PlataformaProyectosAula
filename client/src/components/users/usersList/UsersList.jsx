// Styles
import styles from './UsersList.module.scss';
// Icons
import { FaMagnifyingGlass } from 'react-icons/fa6';
// Dependencies
import { isError, useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContext, useEffect, useState } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';
//Component
import { UserCard } from '../usercard/UserCard';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';
// Requests
import { getUsers } from '../../../api/usersApi';
import { filterUsers } from '../../../api/usersApi';

export const UsersList = () => {
	const { setVisible, visible } = useContext(WarningContext);
	// const [filter, setFilter] = useState('');

	// const fetchUsers = useQuery({
	// 	queryKey: ['users'],
	// 	queryFn: getUsers,
	// });

	// const fetchUsersWithFilter = useQuery({
	// 	queryKey: ['filter-users'],
	// 	queryFn: filterUsers(filter),
	// 	onSuccess: {
	// 		function() {
	// 			console.log(fetchUsersWithFilter.data);
	// 		},
	// 	},
	// });

	const handleInputOnChange = (e) => {
		setFilter(e.target.value);
		console.log(filter);
	};

	// useEffect(() => {
	// 	if (fetchUsers.isError || fetchUsers.isSuccess) {
	// 		setVisible((prevVisibility) => ({
	// 			...prevVisibility,
	// 			listUsersError: isError,
	// 		}));
	// 	}
	// }, [fetchUsers.isError, fetchUsers.isSuccess]);

	// useEffect(() => {
	// 	fetchUsers;
	// }, [filter !== '']);

	const user = {
		data: {
			id: 1,
			attributes: {
				user_name: '@user',
				code: 227272772,
				email: 'user@gmail.com',
				description: 'lorem',
				role: 2,
				state: 1,
			},
		},
	};

	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>Usuarios</h1>
			<div className={styles.section__filter}>
				<form className={styles.form}>
					<input
						type='text'
						name='filter'
						className={styles.form__input}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					/>
					<button type='submit' className={styles.form__button}>
						<FaMagnifyingGlass />
					</button>
				</form>
			</div>
			{/* {fetchUsers.data && fetchUsers.data.length === 0 && <NothingToSee />}
			{fetchUsers.isLoading && (
				<div className={styles.section__loader}>
					<ClipLoader
						loading={fetchUsers.isLoading}
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			)}

			{fetchUsers.data &&
				fetchUsers.data.map((user) => (
					<UserCard user={user} key={user.data.id} />
				))} */}

			<UserCard user={user} />
		</section>
	);
};
