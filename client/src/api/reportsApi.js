import axios from "axios";
const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);


const createReport = async (data)=>{
    try {
        const response = await axios.post(`${baseUrl}reports`, { headers: { 'ngrok-skip-browser-warning': true } },
        { params: data },);

        return response;
    } catch (error) {
        throw error;
    }
}

export {createReport}