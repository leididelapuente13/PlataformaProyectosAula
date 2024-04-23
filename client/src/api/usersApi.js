// Dependencies
import axios from 'axios';

const url = '';

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.get('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const getUsers = async () => {
	try {
		const response = axios.get(`${url}/users`);
		console.log(response);
	} catch (error) {
		console.error('Ha ocurrido un error', error);
	}
};

export { getUsers };
