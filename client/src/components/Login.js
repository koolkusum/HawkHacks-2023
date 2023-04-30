import React, {useState} from 'react';
import {getUser} from '../api';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Style.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await getUser(email,password);//if response status code
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);

        if (response.status===200)
        {
          nav('/StudentPage');
        }
        //console.log(response); // do something with the user data, like redirect to a new page
      } catch (error) {
        console.error(error); // handle errors
      }
    };
  
    return (
      <div className="login">
         <h1>Login</h1> 
        <form onSubmit={handleLogin}>
          <label>
            {/* Email: */}
            <input
              type="email"
              value={email}
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            {/* Password: */}
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
        </form>
  
      </div>
    );
  }
  
  export default Login;