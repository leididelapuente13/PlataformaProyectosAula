import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const getMyProfile = async (userId) => {
	// try {
	// 	const response = await axios.get(
	// 		`${baseUrl}profile`,
	// 		{
	// 			headers: {
	// 				'ngrok-skip-browser-warning': true,
	// 			},
	// 		},
	// 		{ params: { userId } },
	// 	);
	// 	console.log(response);
	// 	return response;
	// } catch (error) {
	// 	throw error;
	// }
};

const getMyProjects = async (userId) => {
	// try {
	// 	const response = await axios.get(
	// 		`${baseUrl}post`,
	// 		{ headers: { 'ngrok-skip-browser-warning': true } },
	// 		{ params: { userId } },
	// 	);
	// 	return response;
	// } catch (error) {
	// 	throw error;
	// }
};

export { getMyProfile, getMyProjects};
