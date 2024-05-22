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
	const [filter, setFilter] = useState({ input: '', userState: '', role: '' });
	const [pages, setPages] = useState({
		first: '/?page=1',
		last: '',
		next: '',
		prev: null,
	});
	const [page, setPage] = useState('/?page=1');

	const handleInputOnChange = (e) => {
		const { name, value } = e.target;
		setFilter((prev) => ({ ...prev, [name]: value }));
	};

	const userFilter = useQuery(
		['filter', filter.input, filter.userState, filter.role],
		() => filterUsers(filter),
		{ refetchOnWindowFocus: false },
		{
			onSuccess: () => {
				// console.log(filter.input, filter.userState, filter.role);
			},
		},
		{ refetchInterval: 10000, staleTime: 30000 },
	);

	const getUsersData = useQuery(['users'], () => getUsers(page), {
		onSuccess: (data) =>
			setPages((prevPages) => ({
				...prevPages,
				last: data.pages.last,
				next: data.pages.next,
				prev: data.pages.prev,
			})),
	});

	useEffect(() => {
		if (
			filter.input !== '' ||
			filter.userState !== '' ||
			filter.userState !== ''
		) {
			userFilter.refetch();
		}
	}, [filter.input, filter.userState, filter.role]);

	useEffect(() => {
		console.log(page);
	}, [page]);

	return (
		<section className={styles.section} role='main'>
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
						name='role'
						value={filter.input === '' && ''}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					>
						<option value='*'>Todos</option>
						<option value='2'>Estudiante</option>
						<option value='3'>Profesor</option>
					</select>
					<select
						className={styles.form__input}
						name='userState'
						value={filter.input === '' && ''}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					>
						<option value='*'>Todos</option>
						<option value='1'>Activos</option>
						<option value='0'>Desactivos</option>
					</select>
					{/* <button type='submit' className={styles.form__button}>
						<FaMagnifyingGlass />
					</button> */}
				</form>
			</div>
			{/* {(users.data === 204) && (
				<div role='status'>
					<NothingToSee />
				</div>
			)} */}
			{(userFilter.isLoading || getUsersData.isLoading) && (
				<div className={styles.section__loader} role='progressbar'>
					<ClipLoader
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			)}
			<div role='article' className={styles.section__cardContainer}>
				{(filter.input === '' ||
					filter.role === '' ||
					filter.userState === '') &&
					getUsersData.data !== undefined &&
					userFilter.data === undefined &&
					getUsersData.data.data.map((user) => <UserCard user={user} key={user.id} />)}
				{userFilter.data !== undefined &&
					userFilter.data !== 204 &&
					userFilter.data.map((user) => <UserCard user={user} key={user.id} />)}
			</div>
			<div className={styles.section__filter}>
				<button type='button' onClick={() => setPage(pages.first)}>
					Primera
				</button>
				<button type='button' onClick={() => setPage(pages.prev)}>
					Previa
				</button>
				<button type='button' onClick={() => setPage(pages.next)}>
					Siguiente
				</button>
				<button type='button' onClick={() => setPage(pages.last)}>
					Ultima
				</button>
			</div>
			{userFilter.data === 204 && <NothingToSee />}
		</section>
	);
};
