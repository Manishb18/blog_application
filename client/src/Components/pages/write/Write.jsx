import React from 'react';
import { useContext, useState } from "react";
import axios from "axios";
import './write.css'
import { Context } from '../../../context/Context';
export default function Write() {
  const { user, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  console.log(user.username)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    console.log(newPost)
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className='WriteContainer'>
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="writeFormCover">
                <i className = "writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" name="writeFormCover" 
                id="writeFormCover" 
                style = {{display : "none"}}
                onChange={(e) => setFile(e.target.files[0])}
                />
                <input type="text" 
                className='writeForminput writeTitle'
                placeholder='Title' 
                autoFocus = {true}
                onChange={e=>setTitle(e.target.value)}
                />
            </div>
            {
              file &&(
              <img className = "writeCoverImg" src = {URL.createObjectURL(file)} />
              )
            }
            
            <div className="writeFormGroup">
                <textarea 
                type = 'text'
                className = "writeText writeDesc"
                 placeholder =  "Write your story here...." 
                 cols="80" rows="10"
                 onChange={e=>setDesc(e.target.value)}
                 ></textarea>
            </div>
            <button className = 'writeSubmit' type="submit">publish</button>
        </form>
    </div>
  )
}
