import CareerCard from '../../../../careers/card/CareerCard';

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
	return (
		<section style={sectionStyle}>
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
