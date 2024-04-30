// Dependencies
import { useQuery } from 'react-query';
// Component
import CareerCard from '../../../../careers/careercard/CareerCard';
import {NothingToSee}  from '../../../../utils/NothingToSee/NothingToSee';
import PacmanLoader from 'react-spinners/PacmanLoader';
// Request
import { getCareersRequest } from '../../../../../api/careersApi';

export const Careers = () => {
	const careers = [
		{
			id: 1,
			name: 'carrera 1',
		},
		{
			id: 2,
			name: 'carrera 1',
		},
		{
			id: 3,
			name: 'carrera 1',
		},
		{
			id: 4,
			name: 'carrera 1',
		},
	];

	const { isLoading, data } = useQuery({
		queryKey: ['careers'],
		queryFn: getCareersRequest(),
	});

	return (
		<section style={sectionStyle} alt="section">
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
			</div>
			{data.length === 0 && <NothingToSee />}
			{data.length > 0 &&
				data.map((career) => <CareerCard career={career} key={career.id} />)}
			{careers.map((career) => (
				<CareerCard career={career} key={career.id} />
			))}
		</section>
	);
};

const sectionStyle = {
	width: '80%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '2rem',
	margin: '2rem auto',
};
