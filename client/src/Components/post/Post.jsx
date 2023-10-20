import React from 'react'
import './Post.css'
import {Link} from 'react-router-dom'
export default function Post({post}) {

  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
        <div className="postItem">
          {post.photo && (
          <img className = "postImg"
           src= {PF+post.photo}
           alt = "Failed to load the image"/>
          )}
          <div className="postInfo">
            <div className="postTitle">
              <Link to = {`posts/${post._id}`}
               className = 'link'>
                {post.title}
              </Link>
            </div>
            <hr />
            <div className="postDesc">
                {post.desc}
            </div>
            <div className="postTimeStamp">
                {new Date(post.createdAt).toDateString()}
            </div>
          </div>
        </div>
      </div>
  )
}