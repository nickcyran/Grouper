import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
     return (<nav className="nav">
          <ul> 

               <Link to="/">Messaging</Link>&nbsp;
               <Link to="/viewcalendar">Calendar</Link>&nbsp;
               <Link to="/events">Events</Link>&nbsp;
               <Link to="/serverhome">Servers</Link>&nbsp;
               <Link to="/login">Login</Link>&nbsp;
               <Link to="/signup">Signup</Link>&nbsp;
               <Link to="/profileSettings">Profile</Link>&nbsp;
               <Link to="/addFriend">Add friend</Link>&nbsp;
          </ul>
     </nav>)
}