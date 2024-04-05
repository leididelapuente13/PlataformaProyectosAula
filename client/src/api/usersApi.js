// Dependencies
import axios from 'axios';
import Cookies from 'js-cookie';

const url = 'https://d72f-186-116-193-121.ngrok-free.app/api/';

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
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
