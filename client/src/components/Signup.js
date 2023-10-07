import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser} from '../api';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const nav = useNavigate();
  const resets = sessionStorage.setItem('resets', 0)
  const handleNext = () => {
    // Validate input and proceed to the next step
    if (step === 1) {
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
    } else if (step === 2) {
        if(interests.length ===0)
        {
            alert('Please selectat least one interest.');
            return;
        }
    }

    // Proceed to the next step
    setStep(step + 1);
  };
  
  const handleInterestChange = (event) => {
    // Toggle the interests checkbox selections
    const interest = event.target.value;
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

      const user = { name, email, password, interests};
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);

      const response = await createUser(user);
      if (response.status===200)
      {

        nav('/StudentPage');

      }
      console.log(response);
      // code to redirect the user to their dashboard goes here

  };

  return (
    <div className="Signup">
    <h1>Sign Up</h1>
    {step===1 &&( 
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          className="form-control"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className="form-control"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
    </form>
    )}
          {step === 2 && (
     <form onSubmit={handleSubmit}>
     {/* Step 2: Collect user interests */}
     <div className="form-group">
       <label>Interests:</label>
       <div>
         <label>
           <input
             type="checkbox"
             value="social"
             onChange={handleInterestChange}
             checked={interests.includes('social')}
           />{' '}
           Social Events
         </label>
       </div>
       <div>
         <label>
           <input
             type="checkbox"
             value="academic"
             onChange={handleInterestChange}
             checked={interests.includes('academic')}
           />{' '}
           Academic Events
         </label>
       </div>
       <div>
         <label>
           <input
             type="checkbox"
             value="service"
             onChange={handleInterestChange}
             checked={interests.includes('service')}
           />{' '}
           Service Events
         </label>
       </div>
       <div>
         <label>
           <input
             type="checkbox"
             value="career"
             onChange={handleInterestChange}
             checked={interests.includes('')}
           />{' '}
           Career Events
         </label>
       </div>
     </div>
     <button type="button" className="btn btn-primary" onClick={handleNext}>
       Next
     </button>
     <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>
       Previous
     </button>
     <div className="mt-3">
       Already have an account? <Link to="/Login">Log in</Link>
     </div>
   </form>
      )}

    </div>
  );
}

export default Signup;