import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e)=>{
    setError(false);
    e.preventDefault();
    try{
      const res = await axios.post("/auth/register",{
        username,email, password,
      });
      res.data && window.location.replace("/login");
    }
    catch(err){
      setError(true);
    }
  };

  return (
    <div className='register'>
            <span className="registerTitle">
                Register Now
            </span>
        <form className = 'registerForm' onSubmit={handleSubmit}>
          <label htmlFor="usernameInput">Username</label>
          <input placeholder = 'Enter your username' 
          className = 'registerInput' 
          type="text" name="" id="usernameInput"
          onChange={e=> setUsername(e.target.value)}
          />
            <label htmlFor="emailInput" className="emailInput">
                Email
            </label>
            <input placeholder = 'Enter your email'
             className = 'registerInput' 
             type="email" name="" id="emailInput" 
             onChange={e=> setEmail(e.target.value)}
             />

            <label htmlFor="passwordInput">Password</label>
            <input placeholder = 'Enter your password' 
            className = 'registerInput' 
            type="password"  id="passwordInput"
            onChange={e=> setPassword(e.target.value)}
            />

            <button className='registerButton' type = "submit" >Register</button>
        </form>
            <button className = 'registerLoginBtn' type="button"><Link className='link' to = '/login'>Login</Link></button>
            {error && <span style = {{color : "red", marginTop : "10px"}}>Something went wrong!!!</span>}
    </div>
  )
}
