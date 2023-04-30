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


export const initializeCourseTopics = async (email, password) => {
    const response = await axios.put(`${API_URL}/users/initializeCourseTopics/${email}/${password}`);
    return response;
}

export const getCourse = async (email, password) => {
    const response = await axios.get(`${API_URL}/users/getCourse/${email}/${password}`);
    return response;
}
export const getUser = async(email,password)=>{
    const response = await axios.get(`${API_URL}/users/getUser/${email}/${password}`);
    return response;
}
export const initializeCourse = async (email, password)=>
{
    const response = await axios.put(`${API_URL}/users/initializeCourse/${email}/${password}`);
    return response;
}
export const getTopics = async (email, password) => {
    const response = await axios.get(`${API_URL}/users/getTopics/${email}/${password}`);
    return response;
}

export const updateTopic =async(email,password, rateTopic, rateValues) => {
    const response = await axios.put(`${API_URL}/users/updateTopic/${email}/${password}/${rateTopic}/${rateValues}`);
    return response;
}
export const offerHelp = async (email,password,rateTopic)=> {
    const response = await axios.put(`${API_URL}/users/offerHelp/${email}/${password}/${rateTopic}`);
    return response;
}