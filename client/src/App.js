import Homepage from "./Components/pages/homepage/Homepage";
import TopBar from "./Components/topbar/TopBar"
import Login from "./Components/pages/login/Login";
import Register from "./Components/pages/register/Register";
import Settings from "./Components/pages/settings/Settings";
import Single from "./Components/pages/single/Single";
import Write from "./Components/pages/write/Write";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>
      <Routes>
        <Route exact path = "/" element={user ? <Homepage /> : <Homepage/>}/>
        <Route  path = "/register" element={<Register/>}/>
        <Route  path = "/login" element={user ? <Homepage /> : <Login/>}/>
        <Route  path = "/write" element={user ? <Write /> : <Login/>}/>
        <Route path = "/posts/:id" element={<Single/>}/>
        <Route path = "/settings" element={user ? <Settings/> : <Register/>}/>
      </Routes>
    </Router>
  );
}
export default App;
