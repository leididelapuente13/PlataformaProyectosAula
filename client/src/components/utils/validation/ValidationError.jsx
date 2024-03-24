import { PropTypes } from 'prop-types';

export const ValidationError = ({ message }) => {
	return <span style={styles}>{message}</span>;
};

const styles = {
	color: '#BE221F',
	fontSize: '0.8rem',
};

ValidationError.propTypes = {
	message: PropTypes.string.isRequired,
};
