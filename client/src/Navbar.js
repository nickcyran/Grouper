import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css';
import axios from 'axios';

const hand = () => {

}

export default function Navbar() {
     return (<nav className="nav" id="navbar">

          <Link to="/addFriend">Add friend</Link>&nbsp;
          <Link to="/">Messaging</Link>&nbsp;
          <Link to="/viewcalendar">Calendar</Link>&nbsp;
          <Link to="/events">Events</Link>&nbsp;
          <Link to="/serverhome">Servers</Link>&nbsp;
          <Link to="/login">Login</Link>&nbsp;
          <Link to="/signup">Signup</Link>&nbsp;
          <Link to="/profileSettings">Profile</Link>&nbsp;
          <div onClick={() => hand()}>test</div>
     </nav>)
}