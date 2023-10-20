import React, { useState, useEffect } from 'react'
import './singlePost.css'
import { useLocation } from 'react-router'
import axios from 'axios';
import {Link} from 'react-router-dom' 
import { Context } from '../../context/Context';
import { useContext } from 'react';
export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState([]);
    const PF = "http://localhost:5000/images/";

    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async()=>{
            const res = await axios.get("/posts/"+path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]);
    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
      const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };

  return (
    <div className='singlePost'>
        {updateMode ? 
            <input type='text' value = {title}  autoFocus onChange={(e) => setTitle(e.target.value)}>
            </input>
            :
            <div className="singlePostAuthorDetails">
            <div className="singlePostTitle">
               {title}
            </div>
                <div className="singlePostAuthorName">
                    Author  : 
                    <Link to={`/?user=${post.username}`} className = 'link'>
                    {post.username}
                    </Link>
                </div>
                <div className="contactAuthorIcons">
                <i className ="contactIcon fa-brands fa-instagram"></i>
                <i className ="contactIcon fa-brands fa-x-twitter"></i>
                <i className ="contactIcon fa-brands fa-square-facebook"></i>
                </div>
            </div>
        }
        <div className="editItems">
            <div className="likeAndComment">
            <i class="edit-Icons fa-solid fa-thumbs-up"></i>
            <i class="edit-Icons fa-solid fa-comment"></i>
            </div>
            {
              user.username === post.username ?  <div className="editAndDelete">
              <button type="button" className = "editButton" onClick={() => setUpdateMode(true)}>Edit</button>
              <button type="button" className = "editButton" onClick={handleDelete}>Delete</button>
            </div> : 
            <div>

            </div>
            }
           
        </div>
        {
            post.photo && (
                <img className = "singlePostImage"
                 src={PF+post.photo}
                 />
        )}
        {updateMode ? 
        <textarea 
        className='singlePostDescInput'
        value = {desc} 
        cols="30" rows="10"
        onChange={(e) => setDesc(e.target.value)}/>
         :
         <div className="singlePostDesc">
            {desc}
        </div>
        }

        {updateMode && 
        <button className='singlePostButton' onClick={handleUpdate}>Update</button> 
        }
       
    </div>
  )
}
