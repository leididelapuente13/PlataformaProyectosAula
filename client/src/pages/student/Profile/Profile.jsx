// Styles
import styles from './Profile.module.scss';
// Icons
import { IoSettingsSharp } from 'react-icons/io5';
import icon from '../../../assets/img/default/profile-picture.jpg';
// Dependencies

// Request

// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';

export const Profile = () => {
	return (
		<>
			<main>
				<Nav />
				<section>
					<button>
						<IoSettingsSharp />
					</button>
					<img src={icon} alt='profile picture' />
					<p>User name</p>
					<p>Description</p>
					<div>
						<div>Carrera</div>
						<div>Semestre</div>
					</div>
				</section>
			</main>
		</>
	);
};
