
import "./topbar.css";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleLogout = ()=>{
        dispatch({type : "LOGOUT"});
    };
    
  return (
    <div className= "top">
        <div className="topLeft">
        <Link className = "link" to = "/">Go Blog</Link>
        </div>
        <div className="topCenter">
            <ul className="list">
                <li className="listItem"><Link className = "link" to = "/">Home</Link></li>
                <li className="listItem"><Link className = "link" to = "/about">About</Link></li>
                <li className="listItem"><Link className = "link" to = "/contact">Contact</Link></li>
                <li className="listItem">{!user? <Link className = "link" to = "/login">Write</Link>:
                    <Link className = "link" to = "/write">Write</Link>}
                </li>
                <li className="listItem">
                    {user &&  <Link className = "link" to = "/login" onClick = {handleLogout}>Logout</Link>}
                </li>
            </ul>
        </div>
        <div className="topRight">
            <div className="searchBar">
                <input type="search" name="search" id="searchBar"placeholder='search here' />
            </div>
            {user?(
            <Link className="link" to = "/settings"><img
            className="topImg"
            src= {PF+user.profilePic}
          /></Link>)
            :(
            <ul className="list">
            <li className="listItem"><Link className = "link" to = "/login">Login</Link></li>
            <li className="listItem"><Link className = "link" to = "/register">Register</Link></li>
        </ul>)
            }
        </div>
    </div>
  )
}
