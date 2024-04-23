import axios from 'axios';

const url = 'https://d72f-186-116-193-121.ngrok-free.app/api/'

const registerRequest = async (userData) =>{
    try {
        const response = await axios.post(`${url}user`, userData);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.response.data.errors);
        throw error;
    }
}

const loginRequest = async (userData)=>{
    try {
        const response = await axios.post(`${url}login`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const logoutRequest = async ()=>{
    axios.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${localStorage.get('token')}`;
            return config;
        },
    
        (error) => {
            return Promise.reject(error);
        },
    );

    try {
        const response = await axios.post(`${url}logout`);
        return response.status;
    }catch(error){
        throw error;
    }
}

export {registerRequest, loginRequest, logoutRequest}
