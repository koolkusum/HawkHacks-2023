import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '../api';

function StudentPage(){
    const[completedcourses, setCourses] = useState([]);
    useEffect(() => {
        async function fetchCompletedData() {
          try {
            const email = sessionStorage.getItem('email')
            const password = sessionStorage.getItem('password')
            const data = await getCourse(email, password);
            setCourses(data.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchCompletedData();
      }, [])
    return (
        <div>
        <h1>Hello Student</h1>
        <h2>My Courses:</h2>
        <ul>
            {completedcourses.map(course => (
                <li key={course._id}>
                    <Link to={`/course/${course._id}`}>{course.name}</Link>
                </li>
            ))}
        </ul>
    </div>
    );
}
export default StudentPage;