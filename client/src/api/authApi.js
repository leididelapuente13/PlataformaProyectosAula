import axios from 'axios';

const url = 'https://fd0e-190-131-212-158.ngrok-free.app/api/'

const registerRequest = async (userData) =>{
    try {
        const response = await axios.post(`${url}user`, userData);
        console.log(response.data);
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

export {registerRequest, loginRequest}
