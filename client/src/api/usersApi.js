import axios from "axios";

const url = '';

const getUsers = async ()=>{
    try{
        const response = axios.get(`${url}/users`);
        console.log(response);
    }catch (error){
        console.error('Ha ocurrido un error', error);
    }
}

export {getUsers}