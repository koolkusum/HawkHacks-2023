import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCourse, getTopics, updateTopic , offerHelp} from '../api';

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
  };
const handleOfferHelp = async (topicName) => {
  try{
  const email = sessionStorage.getItem('email');
  const password = sessionStorage.getItem('password');
  const offerTopic = completedTopics.find(topic => topic.name === topicName);
  if (offerTopic && offerTopic.offerhelp) {
    console.log(`Topic "${topicName}" has already offered help.`);
    return;
  }
  await offerHelp(email, password, topicName);
}catch (error) {
    console.error(error);
  }

};
  return (
    <div style={{  padding: '20px' }}>
    <a href="/Login" id="logout-btn">Logout</a>
    <h1>Hello Student</h1>
    <h2 style={{ color: 'white', fontSize: '40px', paddingLeft: '820px' }}>My Courses:</h2>
    {completedCourses.map(course => (
        <div key={course._id} style={{ maxWidth: '600px', backgroundColor: 'white', margin: '20px auto', padding: '20px' }}>
            <h3 style={{ fontSize: '34px', color: '#333', paddingLeft: '190px' }}>{course.name}</h3>
            <ul style={{ listStyle: 'none' }}>
                {completedTopics.map(topic => (
                    <li key={topic.name}>
                        <h4 style={{ fontSize: '24px', color: '#333', paddingLeft: '10px' }}>{topic.name}</h4>
                        {ratings[topic.name] === undefined && !topic.completed ? (
                            <div className="radioshitheads" style={{ maxWidth: '240px', paddingLeft: '27px' }}>
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
                                <p style={{ color: '#333', paddingLeft: '20px' }}>Thank you for rating!</p>
                                {ratings[topic.name] >= 4 && (
                                    <button onClick={() => handleOfferHelp(topic.name)}>Offer Help</button>
                                )}
                                {ratings[topic.name] <= 3 && (
                                    <div className="listOfEmails" style={{ color: '#333' }}>
                                      <p style={{ color: '#333', paddingLeft: '20px' }}>These people can help you!</p>
                                        <ul className="poop" style={{ color: '#333', fontSize: '20px', padding:'20px' }}>
                                            <li>Kusum Gandham kg6199@scarletmail.rutgers.edu</li>
                                            <li>Khushi Ranpura kcr619@scarletmail.rutgers.edu</li>
                                            <li>Cynthia Aguero ca439@scarletmail.rutgers.edu</li>
                                            <li>Haider Ali hya793@scarletmail.rutgers.edu</li>
                                        </ul>
                                    </div>
                                )}
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
