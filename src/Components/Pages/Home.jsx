import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios from 'axios';
import ReviewContainer from './ReviewContainer';
import PostContainer from './PostContainer';
import Story from './Story';


const Home = (props) => {
  const [imageData, setImageData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [i,setI]=useState(0);

  const userID = localStorage.getItem("userID");
  
  const fetchData2 = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/homePage`);
      setHomeData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/homePage`);
        setHomeData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/userDetails`);
        setUserData(response.data);
        // setLoading(false);
      } catch (error) {
        setError('Error fetching data.');
        // setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const specificComment=async(e)=>{    
    setI(1);

    const reviewTemp={
      id:e.target.parentElement.parentElement.parentElement.firstChild.innerText.toString()
    }    
    
    
    try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/reviewShow`, reviewTemp);
    setReviewData(response.data);
      console.log('Review successful:', response.data);
    } catch (error) {
      console.error('Error during review submission:', error.response ? error.response.data : 'Unknown error');
    }
  
  }

  const remove=()=>{

    setI(0);

  }

  return (
    <div className={styles.home}>

      <Story/>

      {userID ?
            loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (

              <PostContainer homeData={homeData} userData={props.userData} fetchData={fetchData2} specificComment={specificComment} /> 

            )
       :
            <h1 style={{marginLeft:'600px',height:'100vh'}}>LOGIN KAR PEHLE</h1>

      }
           
           {userID && i ?
            loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
      
              <ReviewContainer reviewData={reviewData} remove={remove} />
            
            )
       :
            null
      }
 
    </div>



)
  
};

export default Home;
