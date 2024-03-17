import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    name: "api", 
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers, {getState})=>{
            const token = getState().user.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
                console.log('Token enviado en la solicitud:', token);
            }
            return headers;
        }
    }), 

    endpoints: (builder)=>({
        userLogIn: builder.mutation({
            query: (userData) =>({
                url: 'login', 
                method: 'POST', 
                body: userData
            })
        })
    })
})

export const {useUserLogInMutation} = apiSlice
