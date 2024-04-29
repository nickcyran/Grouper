import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
     const navigate = useNavigate();

     const signOut = () => {
          localStorage.clear();
          navigate("/Login");
     }

     return (<nav className="nav" id="navbar">
          <div className="wrap">
               <div className="links">
                    <Link to="/">Messaging</Link>&nbsp;
                    <Link to="/viewcalendar">Calendar</Link>&nbsp;
                    <Link to="/events">Events</Link>&nbsp;
                    <Link to="/serverhome">Servers</Link>&nbsp;
                    <Link to="/profileSettings">Profile</Link>&nbsp;
               </div>

               <div className="signoutBox">
                    <div className="signoutButton" onClick={() => signOut()}>sign out</div>
               </div>
          </div>


     </nav>)
}