// Styles
import styles from './Profile.module.scss';
// Icons
import { IoSettingsSharp } from 'react-icons/io5';
import icon from '../../../assets/img/default/profile-picture.jpg';
// Dependencies
import { useQuery } from 'react-query';
// Request
import { getMyProfile } from '../../../api/profileApi';
// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';
import { useEffect, useState } from 'react';
import { ProjectCard } from '../../../components/project/ProjectCard';

export const Profile = () => {
	const [section, setSection] = useState({ projects: true, groups: false });

	// const profile = useQuery({
	// 	queryKey: ['profile', { key: localStorage.getItem('token') }],
	// 	queryFn: getMyProfile(localStorage.getItem('token')),
	// });

	// useEffect(()=>{
	//     profile();
	// console.log(fetchMyProfile.data);
	// }, []);

	return (
		<>
			<main>
				<Nav />
				<section className={styles.profile}>
					<button className={styles.profile__button}>
						<IoSettingsSharp />
					</button>
					<div className={styles.section__img__container}>
						<img
							src={icon}
							alt='profile picture'
							className={styles.profile__img}
						/>
					</div>
					<div>
						<p className={styles.profile__text__bold}>@user_name</p>
						<p className={styles.profile__text__light}>nombre y apellido</p>
					</div>
					<p className={styles.profile__text__regular}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, facere?
					</p>
					<div className={styles.profile__container}>
						<div className={styles.profile__rectangle}>Carrera</div>
						<div className={styles.profile__rectangle}>Semestre</div>
					</div>
				</section>
				<section className={styles.section}>
					<div className={styles.section__button__container}>
						<button
							className={
								section.projects
									? styles.section__button__active
									: styles.section__button
							}
							onClick={() =>
								setSection((prev) => ({
									...prev,
									projects: true,
									groups: false,
								}))
							}
						>
							Mis Proyectos
						</button>
						<button
							className={
								section.groups
									? styles.section__button__active
									: styles.section__button
							}
							onClick={() =>
								setSection((prev) => ({
									...prev,
									groups: true,
									projects: false,
								}))
							}
						>
							Mis Grupos
						</button>
					</div>
					{section.projects && <ProjectCard />}
					{section.groups && <h4>Grupos</h4>}
				</section>
			</main>
		</>
	);
};
