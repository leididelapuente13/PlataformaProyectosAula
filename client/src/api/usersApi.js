// Dependencies
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
// const baseUrl = 'https://9360-181-143-211-148.ngrok-free.app';

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const getUsers = async () => {
	try {
		const response = await axios.get(`${baseUrl}user`, {
			headers: {
				'ngrok-skip-browser-warning': true,
			},
		});
		console.log('Full query');
		return response.data.data;
	} catch (error) {
		console.error('Ha ocurrido un error', error);
	}
};

const filterUsers = async (condition) => {
	console.log('Request: ', condition);
	if (condition !== '') {
		if(condition.userState !== '' || condition.role !== ''){
			const state = condition.userState === '*' ? '' : condition.userState;
			const role = condition.role === '*' ? '' : condition.role;
			try {
				const response = await axios.get(`${baseUrl}user?filter/[role_id]=${role}&filter[state]=${state}`, {
					headers: { 'ngrok-skip-browser-warning': true },
				});
				console.log('Filter');
				return response.data.data;
			} catch (error) {
				console.error(error);
			}
		}else {
			try {
				const response = await axios.get(`${baseUrl}user/filter/${condition}`, {
					headers: { 'ngrok-skip-browser-warning': true },
				});
				console.log('Filter');
				return response.data.data;
			} catch (error) {
				console.error(error);
			}
		}
	}
};

const deactivateUser = async (userId) => {
	try {
		const response = await axios.put(`${baseUrl}users/${userId}`, { state: 0 });
		return response;
	} catch (error) {
		throw error;
	}
};

const activateUser = async (userId) => {
	try {
		const response = await axios.put(`${baseUrl}users/${userId}`, { state: 1 });
		return response;
	} catch (error) {
		throw error;
	}
};

export { getUsers, filterUsers, activateUser, deactivateUser };
