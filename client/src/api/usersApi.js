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
		if(response.status === 204) return 204
		return response.data.data;
	} catch (error) {
		console.error('Ha ocurrido un error', error);
	}
};

const filterUsers = async (condition) => {
	const {input, userState, role} = condition;
	if (condition !== null) {
		console.log('Request: ', condition);
		if((userState !== '' || role !== '') && input === ''){
			console.log('by role or state')
			const state = userState === '*' ? '' : userState;
			const userRole = role === '*' ? '' : role;
			let queryState = (state !== '' && userRole === '') && `filter[state]=${state}`;
			let queryRole = (userRole !== '' && state === '') && `filter[role_id]=${userRole}`;
			let dualQuery = (userRole !== '' && state !== '') && `${queryRole}&${queryState}`;
			try {
				const response = await axios.get(`${baseUrl}user?${queryRole}${queryRole}${dualQuery}`, {
					headers: { 'ngrok-skip-browser-warning': true },
				});
				console.log('mixed filter: ', response.data.data);
				console.log(response.status);
				if(response.status === 204) return 204;
				return response.data.data;
			} catch (error) {
				console.error(error);
			}
		}else if(input !== ''){
			console.log('by coincidence')
			try {
				const response = await axios.get(`${baseUrl}user/filter/${condition}`, {
					headers: { 'ngrok-skip-browser-warning': true },
				});
				console.log('coincidence: ', response.data.data);
				console.log(response.status === 204 && response.status);
				if(response.status === 204) return 204;
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
