import axios from 'axios';

const url = 'https://91d0-186-116-194-14.ngrok-free.app/api/'

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

const logoutRequest = async ()=>{
    try {
        const response = await axios.post(`${url}logout`, )
    }catch(error){
        throw error;
    }
}

export {registerRequest, loginRequest, logoutRequest}
