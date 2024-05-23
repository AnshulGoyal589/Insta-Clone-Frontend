import React, { useEffect, useState } from 'react'
import styles from './Suggestion.module.css'
import DisplayUser from './DisplayUser'
import axios from 'axios'

const Suggestion = (props) => {
  const userID = localStorage.getItem("userID");
  const name = localStorage.getItem("name");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/allUsers');
        setAllUsers(response.data.users);
      } catch (error) {
        console.error('Error during fetching users:', error.response ? error.response.data : 'Unknown error');
      }
    };
    fetchUsers();
  }, []);

  const userImage = "post" + userID;

  return (
    <div className={styles.main}>
      <DisplayUser userImage={userImage} userID={userID} name={name} />
      <div className={styles.sugg}>
        <p style={{ color: "#A8A8A8", fontSize: '14px', fontWeight: '900' }}>Suggested for you</p>
        <p style={{ color: "#F5F5F5", fontSize: '12px', fontWeight: '900' }}>See All</p>
      </div>
      <div>
        {allUsers.length > 0 ? (
          allUsers.map((item, index) => (
            <DisplayUser key={index} userImage={ "post" + item.username } usernameID = { item.username }  />
          ))
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
    </div>
  )
}

export default Suggestion
