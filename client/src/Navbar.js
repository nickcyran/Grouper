import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar() {
     return (<nav className="nav">
          <ul>
               <Link to="/main">Messaging</Link>&nbsp;
               <Link to="/viewcalendar">Calendar</Link>&nbsp;
               <Link to="/events">Events</Link>&nbsp;
               <Link to="/login">Login</Link>&nbsp;
               <Link to="/signup">Signup</Link>&nbsp;
          </ul>
     </nav>)
}