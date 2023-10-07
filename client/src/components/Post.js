import React, { useState, useEffect } from 'react';
import { Link } from 'react-reactor-dom';
import { useNavigate } from 'react-router-dom';
import { updatePost } from '../api';
function Post()
{
    const [activity, setActivity] = useState('');
    const [interest, setInterest] = useState('');
    const [desc, setDesc] = useState('');
    const handlePost = async(e) => {

    };
    const handleInterestChange = (event) => {
        // Update the 'interest' state with the selected option's value
        setInterest(event.target.value);
      };

    return(
        <div class = 'post'>
            <h1>Make a Post</h1>
            <form onSubmit = {handlePost}>
                <label>
                    <input
                        className = "form-control"
                        type ="text"
                        id = "activity"
                        name ="activity"
                        value={activity}
                        onChange ={(event) =>setActivity(event.target.value)}
                        placeholder = "Activity"
                    />
                    What event do you want to attend?
                </label>
                <label>
                <select
                    name="interest"
                    id="interest"
                    value={interest} // Bind the 'interest' state to the select element's value
                    onChange={handleInterestChange} // Call the handler on select change
                >
                    <option value="" disabled>Choose an interest</option>
                    <option value="social">Social Event</option>
                    <option value="academic">Academic Event</option>
                    <option value="service">Service Event</option>
                    <option value="career">Career Event</option>
                </select>
                Choose an interest category:
                </label>
                        className = "form-control"
                        type ="text"
                        id = "desc"
                        name ="desc"
                        value={desc}
                        onChange ={(event) =>setActivity(event.target.value)}
                        placeholder = "Activity"
                <label>

                </label>
                
            </form>
        </div>
    );

};
export default Post;