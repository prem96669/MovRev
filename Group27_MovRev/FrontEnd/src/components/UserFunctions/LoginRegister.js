import axios from 'axios'
import jwt_decode from "jwt-decode";
const api_endpoint = "https://awd-backend.herokuapp.com/";

export const register = newUser => {
    return axios
        .post(api_endpoint + "users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
}

export const login = user => {
    return axios
        .post(api_endpoint + "users/login", {
            email: user.email,
            password: user.password
        })
}


export const setUserToken = (key, token) => {
    localStorage.setItem(key, token);
}

export const getUserToken = (key) => {
    let decoded = null;
    try {
        const token = localStorage.getItem(key);
        if(token){
            decoded = jwt_decode(token);
        }
        else{
            decoded = "";
        }
    } catch(error) {
        console.log(error);
    }
    return decoded;
}

export const deleteUserToken = (key) => {
    return localStorage.removeItem(key);
}