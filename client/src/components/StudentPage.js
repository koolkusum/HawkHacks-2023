import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCourse, getTopics,updateTopicRatings } from '../api';

function StudentPage(){
  const [completedCourses, setCourses] = useState([]);
  const [completedTopics, setTopics] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    async function fetchCompletedData() {
      try {
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
        const courseData = await getCourse(email, password);
        const topicData = await getTopics(email, password);
        setCourses(courseData.data);
        setTopics(topicData.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCompletedData();
  }, []);

  const handleRatingChange = (topicId, value) => {
    setRatings({
      ...ratings,
      [topicId]: value,
    });
  };

  const handleSubmit = () => {
    // Do something with the ratings object, such as sending it to the server
    console.log(ratings);

    // Clear the ratings object
    setRatings({});
  };

  return (
    <div>
    <h1>Hello Student</h1>
    <h2>My Courses:</h2>
    {completedCourses.map(course => (
      <div key={course._id} style={{ maxWidth: "600px" }}>
        <h3 style={{ fontSize: "34px", color: "white" }}>{course.name}</h3>
        <ul>
          {completedTopics.map(topic => (
            <li key={topic._id}>
              <h4 style={{ fontSize: "24px", color: "white" }}>{topic.name}</h4>
              {ratings[topic._id] === undefined ? (
                <div className="radioshitheads" style={{ maxWidth: "240px" }}>
                  <form>
                    <label htmlFor={`rating_${topic._id}`}>Rate your Experience:</label>
                    {[1, 2, 3, 4, 5].map(value => (
                      <div key={value} style={{ display: "inline-block", marginRight: "10px", width: "30px" }}>
                        <input type="radio" name={`rating_${topic._id}`} value={value} onChange={() => handleRatingChange(topic._id, value)} />
                        <label style={{ marginLeft: "5px" }}>{value}</label>
                      </div>
                    ))}
                  </form>
                </div>
              ) : (
                <div>
                  <p>Thank you for rating!</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    ))}
    {Object.keys(ratings).length > 0 && (
      <button onClick={handleSubmit}>Submit Ratings</button>
    )}
  </div>
  );
}

export default StudentPage;
