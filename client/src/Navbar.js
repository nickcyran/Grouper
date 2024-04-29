import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
     const navigate = useNavigate();

     const Hand = () => {
          localStorage.clear();
          navigate("/Login");
     }

     return (<nav className="nav" id="navbar">
          <Link to="/">Messaging</Link>&nbsp;
          <Link to="/viewcalendar">Calendar</Link>&nbsp;
          <Link to="/events">Events</Link>&nbsp;
          <Link to="/serverhome">Servers</Link>&nbsp;
          <Link to="/login">Login</Link>&nbsp;
          <Link to="/signup">Signup</Link>&nbsp;
          <Link to="/profileSettings">Profile</Link>&nbsp;
          <div onClick={() => Hand()}>test</div>
     </nav>)
}