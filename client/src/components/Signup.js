import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createUser} from '../api';

async function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit =async(event) =>{
        event.preventDefault();
        console.log ('Passwords do not match');
        return;
    }
    try{
        const user = {name, email, password};
        sessionStorage.setItem ('email',email);
        sessionStorage.setItem('password',password);
        const response = await createUser(user);

    }
    catch(error){

    }
};
