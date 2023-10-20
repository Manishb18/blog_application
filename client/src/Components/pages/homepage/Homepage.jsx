import React, { useState, useEffect} from 'react';
import Header from '../../header/Header';
import Posts from '../../posts/Posts';
import Sidebar from '../../sidebar/Sidebar';
import './homepage.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


  useEffect(() => {
    (async () => {
      const res = await axios.get("/posts"+search);
      console.log(res);
      setPosts(prevPosts => [...prevPosts, ...res.data]);
    })();
  }, [search]);
  
  return (
    <>
      <Header/>
      <div className="content">
        <div className="postContainer">
            <Posts posts = {posts}/>
        </div>
        <div className="sidebarContainer">
            <Sidebar/>
        </div>
      </div>
    </>
  )
}

