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

const createProjectRequest = async (data) => {
	try {
		const response = await axios.post(
			`${baseUrl}post`,
			{ headers: { 'ngrok-skip-browser-warning': true } },
			{ params: data },
		);
		return response;
	} catch (error) {
		throw error;
	}
};

const getProjectRequest = async (projectId) => {
	try {
		const response = await axios.get(
			`${baseUrl}post`,
			{ headers: { 'ngrok-skip-browser-warning': true } },
			{ params: projectId },
		);
		return response;
	} catch (error) {
		throw error;
	}
};

const deleteProjectRequest = async (projectId) => {
	try {
		const response = await axios.delete(`${baseUrl}post`, {
			params: { projectId },
		});
		return response;
	} catch (error) {
		throw error;
	}
};

const getTrendingProjectsRequest = async () => {
	// try {
	// 	const response = await axios.get(`${baseUrl}post/trend`, {
	// 		headers: { 'ngrok-skip-browser-warning': true },
	// 	});
	// 	return response;
	// } catch (error) {
	// 	throw error;
	// }
};

const getProjectsForStudent = async (token) => {
	// try {
	// 	const response = await axios.get(
	// 		`${baseUrl}post/trend`,
	// 		{
	// 			headers: { 'ngrok-skip-browser-warning': true },
	// 		},
	// 		{ params: { token } },
	// 	);
	// 	return response;
	// } catch (error) {
	// 	throw error;
	// }
};

const getFiles = async (url) => {
	try {
		const fileResponse = await axios.get(url, {
			headers: {
				'ngrok-skip-browser-warning': true,
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		});
		console.log(files);
		return fileResponse;
	} catch (error) {
		console.error('Error al obtener los archivos:', error);
		throw error;
	}

};

const getAllProjectsRequest = async () => {
	try {
		const response = await axios.get(`${baseUrl}post`, {
			headers: {
				'ngrok-skip-browser-warning': true,
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export {
	createProjectRequest,
	getProjectRequest,
	deleteProjectRequest,
	getTrendingProjectsRequest,
	getProjectsForStudent,
	getAllProjectsRequest,
};
