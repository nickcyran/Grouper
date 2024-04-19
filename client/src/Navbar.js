import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar() {
     return <nav className="nav">
          <ul>
               <Link to="/main">Messaging</Link>&nbsp;
               <Link to="/viewcalendar">Calendar</Link>&nbsp;
          </ul>
     </nav>
}