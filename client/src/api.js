import axios from 'axios'
const API_URL = 'http://localhost:5000';

export const createUser = async(user)=>{
    const response = await axios.post (`${API_URL}/users/createUser`, user);
    return response;
}
export const getUsers = async(email,password)=>{
    const response = await axios.get(`${API_URL}/users/getUsers/${email}/${password}`);
    return response;
}
export const addCourse = async(email, password, goal) => {
    const response = await axios.put(`${API_URL}/users/updateGoal/${email}/${password}/${goal}`);
    return response;
}