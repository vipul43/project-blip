import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json', 'Accept': '*' }
});

// User Level APIs
export const createUser = async (user) => {
    const response = await httpClient.post(`/user/signup`, JSON.stringify(user));
    return response.data;
}

export const validateUser = async (user) => {
    const response = await httpClient.post(`/user/signin`, JSON.stringify(user));
    return response.data;
}