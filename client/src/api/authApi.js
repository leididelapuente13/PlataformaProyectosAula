import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const registerRequest = async (userData) =>{
    try {
        const response = await axios.post(`${baseUrl}user`, userData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.response.data.errors);
        throw error;
    }
}

const loginRequest = async (userData)=>{
    try {
        const response = await axios.post(`${baseUrl}login`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const logoutRequest = async ()=>{
    axios.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
            return config;
        },
    
        (error) => {
            return Promise.reject(error);
        },
    );

    try {
        const response = await axios.post(`${baseUrl}logout`);
        return response.status;
    }catch(error){
        throw error;
    }
}

export {registerRequest, loginRequest, logoutRequest}
