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

const getCareersRequest = async () => {
	try {
		const response = await axios.get(`${baseUrl}careers`, {
			headers: { 'ngrok-skip-browser-warning': true },
		});
		return response;
	} catch (error) {
		throw error;
	}
};

const getCareerProjectsRequest = (careerId) => {
	try {
		const response = axios.get(
			`${baseUrl}`,
			{ headers: { 'ngrok-skip-browser-warning': true } },
			{ params: { careerId } },
		);
		return response;
	} catch (error) {
		throw error;
	}
};

export { getCareersRequest, getCareerProjectsRequest };
