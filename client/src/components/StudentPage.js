import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCourse, getTopics, updateTopic } from '../api';

function StudentPage() {
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

  const handleRadioChange = async (topicName, rating) => {
    try {
      const email = sessionStorage.getItem('email');
      const password = sessionStorage.getItem('password');
      const completedTopic = completedTopics.find(topic => topic.name === topicName);
      
      if (completedTopic && completedTopic.completed) {
        console.log(`Topic "${topicName}" has already been completed. Skipping rating update.`);
        return;
      }
      
      await updateTopic(email, password, topicName, rating);
      setRatings(prevRatings => ({ ...prevRatings, [topicName]: rating }));
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div>
      <h1>Hello Student</h1>
      <h2>My Courses:</h2>
      {completedCourses.map(course => (
        <div key={course._id} style={{ maxWidth: '600px' }}>
          <h3 style={{ fontSize: '34px', color: 'white' }}>{course.name}</h3>
          <ul>
            {completedTopics.map(topic => (
              <li key={topic.name}>
                <h4 style={{ fontSize: '24px', color: 'white' }}>{topic.name}</h4>
                {ratings[topic.name] === undefined ? (
                  <div className="radioshitheads" style={{ maxWidth: '240px' }}>
                    <form>
                      <label htmlFor={`rating_${topic.name}`}>Rate your Experience:</label>
                      {[1, 2, 3, 4, 5].map(value => (
                        <div key={value} style={{ display: 'inline-block', marginRight: '10px', width: '30px' }}>
                          <input type="radio" name={`rating_${topic.name}`} value={value} onChange={() => handleRadioChange(topic.name, value)} />
                          <label style={{ marginLeft: '5px' }}>{value}</label>
                        </div>
                      ))}
                    </form>
                  </div>
                ) : (
                  <div>
                    <p>Thank you for rating!</p>
                    {/* {ratings[topic.name] >= 4 && (
                      <button onClick={() => handleOfferHelp(topic.name)}>Offer Help</button>
                      )} */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default StudentPage;
