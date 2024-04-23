// Dependencies
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.get('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

const createProject = async (data)=>{
    try {
        const response = await axios.post(`${baseUrl}/project`, {headers: {'ngrok-skip-browser-warning': true}}, {params: data} );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export {createProject}