import React, { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  }, [])

  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          Categories
        </span>
        <ul className="catList">
          {cats.map((c)=>(
            <Link to={`/?cat=${c.name}`} className='link' key={c._id}>
            <li className="cat"  >{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          Follow Us
        </span>
        <div className="sidebarSocial">
        <i className ="sidebarIcon fa-brands fa-instagram"></i>
        <i className ="sidebarIcon fa-brands fa-x-twitter"></i>
        <i className ="sidebarIcon fa-brands fa-square-facebook"></i>
        </div>
      </div>

    </div>
  )
}
