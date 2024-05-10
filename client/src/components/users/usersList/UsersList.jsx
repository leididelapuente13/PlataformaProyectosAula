// Styles
import styles from './UsersList.module.scss';
// Icons
import { FaMagnifyingGlass } from 'react-icons/fa6';
// Dependencies
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContext, useEffect, useState } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';
//Component
import { UserCard } from '../usercard/UserCard';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';
// Requests
import { getUsers, filterUsers } from '../../../api/usersApi';

export const UsersList = () => {
	const { setVisible, visible } = useContext(WarningContext);
	const [filter, setFilter] = useState({ input: '', select: '' });

	const handleInputOnChange = (e) => {
		const { name, value } = e.target;
		setFilter({ [name]: value });
	};

	const userFilter = useQuery(
		['filter', filter.input, filter.select],
		() => filterUsers(filter.input, filter.select),
		{
			onSuccess: (data) => {
				console.log(data);
			},
		},
	);

	const {
		isLoading,
		data: users,
		isError,
	} = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	useEffect(() => {
		if (filter.input !== '' || filter.select !== '') {
			userFilter.refetch();
		}
	}, [filter.input, filter.select]);

	return (
		<section className={styles.section} role='main'>
			<h1 className={styles.section__title}>Usuarios</h1>
			<div className={styles.section__filter}>
				<form className={styles.form}>
					<input
						type='text'
						name='input'
						className={styles.form__input}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					/>
					<select
						className={styles.form__input}
						name='select'
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					>
						<option value='1'>Activos</option>
						<option value='2'>Desactivos</option>
					</select>
					<button type='submit' className={styles.form__button}>
						<FaMagnifyingGlass />
					</button>
				</form>
			</div>
			{users && users.length === 0 && (
				<div role='status'>
					<NothingToSee />
				</div>
			)}
			{(isLoading || userFilter.isLoading) && (
				<div className={styles.section__loader} role='progressbar'>
					<ClipLoader
						loading={isLoading}
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			)}
			<div role='article'>
				{(filter.input === '' && users !== undefined) &&
					users.map((user) => <UserCard user={user} key={user.id} />)}
				{userFilter.data !== undefined &&
				userFilter.data.map((user) => <UserCard user={user} key={user.id} />)}
			</div>
		</section>
	);
};
