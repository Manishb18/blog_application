import React from 'react'
import Sidebar from '../../sidebar/Sidebar'
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from '../../../context/Context';
import './settings.css'
export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password: "");
  const [success, setSuccess] = useState(false);

  
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      console.log(updatedUser);
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE"});
    }
  };


  return (
    <div className = "settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">
                Update Your Account
            </span>
            <span className="settingsDeleteTitle">
                Delete Account
            </span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>

            <label htmlFor="profilePicture">Profile Picture</label>
            <div className="settingsPP">
                <img 
                src= {file? URL.createObjectURL(file) : PF+user.profilePic}
                alt="" />
            <label htmlFor="fileInput"><i className ="settingsPPIcon fa-regular fa-user"></i></label>
            <input type="file" 
            id="fileInput" 
            style={{display  :"none"}}
            onChange={(e)=>
              setFile(e.target.files[0])
            }
            />
            </div>


            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="emailId">Email</label>
            <input type="email"
              id="emailId" 
              placeholder={email}
              onChange={(e)=>setEmail(e.target.value)}
              />

            <label htmlFor="password">Password</label>
            <input type="password" 
            id="password" 
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button className = "settingsSubmit"type="submit">Update</button>

            {
              success && (
                <span  style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
                  Profile has been updated....
                </span>
              )
              
            }
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}
