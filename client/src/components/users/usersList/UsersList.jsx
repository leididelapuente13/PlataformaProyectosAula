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
	const [filter, setFilter] = useState('');

	const handleInputOnChange = (e) => {
		setFilter(e.target.value);
		console.log(filter);
	};

	const { isLoading, data, isError } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	useEffect(() => {
		console.log(data);
	}, [filter !== '', data]);

	return (
		<section className={styles.section} role='main'>
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
			{data && data.length === 0 && (
				<div role='status'>
					<NothingToSee />
				</div>
			)}
			{isLoading && (
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
				{data &&
					data.data.map((user) => <UserCard user={user} key={user.id} />)}
			</div>
		</section>
	);
};
