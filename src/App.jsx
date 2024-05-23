import React, { useState, useEffect } from 'react';
import MainNavigationBar from './Components/MainNavigationBar/MainNavigationBar'
import {Route,Routes,useNavigate} from 'react-router-dom'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import PostSend from './Components/Pages/PostSend';
import SearchSend from './Components/Pages/SearchSend';
import Suggestion from './Components/Pages/Suggestion';



const App = () => {

  let [userData,setUserData]=useState({});

  function setUserDetails(data){
    localStorage.setItem("userID",data.username);
    localStorage.setItem("name",data.firstName + data.lastName);
    setUserData(data);
  }

  const userID= localStorage.getItem("userID");

  
  return (
    <div >
       <MainNavigationBar userData={userData} />
       {/* <AuthProvider> */}

       <Routes>
        <Route
          path="/"
          element={ 
            userID ? (
              <div style={{display:'flex'}} >
              {/* <Story/> */}
              <Home userData={userData} />
              <Suggestion/>
              </div>
            ) : (
              <Login setUserDetails={setUserDetails} />
            )
          }
        />
          <Route path="/login" element={<Login  setUserDetails={setUserDetails}  style={{height:'100px',width:'90px'}} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/send" element={<PostSend userData={userData} />} />
          <Route path="/search" element={<SearchSend/>} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          {/* <Route path="/logout" element={<Logout/>} /> */}
       </Routes>

       {/* </AuthProvider> */}

      
    </div>
  )
}

export default App