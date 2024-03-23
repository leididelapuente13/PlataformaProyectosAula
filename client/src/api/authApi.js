import axios from 'axios';

const url = 'https://0c4b-181-143-211-148.ngrok-free.app/'

const registerRequest = async (userData) =>{
    try {
        const response = await axios.post(`${url}user`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}

const loginRequest = async (userData)=>{
    try {
        const response = await axios.post(`${url}login`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {registerRequest, loginRequest}
