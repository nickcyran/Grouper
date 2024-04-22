import React from 'react'
import {Link} from 'react-router-dom'

import { GetDirectMessages,  CreateDirectMessage } from './controllers'

const testing = () =>{
     var x = localStorage

     x.setItem('userID', '6625904292fb66306cc22be5')
     console.log(x)

     // const fetchData = async () => {
     //      console.log(await GetDirectMessages('6625904292fb66306cc22be5'));
     //  };

     //  fetchData();
}

export default function Navbar() {
     return (<nav className="nav">
          <ul>
               <Link to="/main">Messaging</Link>&nbsp;
               <Link to="/viewcalendar">Calendar</Link>&nbsp;
               <Link to="/events">Events</Link>&nbsp;
               <Link to="/login">Login</Link>&nbsp;
               <Link to="/signup">Signup</Link>&nbsp;
               <span onClick={() => {testing()}}>TEST</span>
          </ul>
     </nav>)
}