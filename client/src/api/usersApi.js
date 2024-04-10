// Dependencies
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

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
		const response = axios.get(`${baseUrl}/users`);
		console.log(response);
	} catch (error) {
		console.error('Ha ocurrido un error', error);
	}
};

const filterUsers = async (condition) => {
	try {
		const response = await axios.get(`${baseUrl}/`, { params: condition });
		console.log(condition);
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export { getUsers, filterUsers };
