import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Register a new user


export async function registerUser(userData) {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', userData);
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

// Login user
export async function loginUser(credentials) {
    try {
        console.log(credentials.email)
        const response = await axios.post('http://localhost:5000/api/users/login', {email : credentials.email , password : credentials.password});
        console.log(response)
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}

export async function logoutUser(){
    try{
       await localStorage.clear()
       console.log("logout successfully");
    }
    catch (error) {
        throw new Error('Failed to logout user');
    }
}
