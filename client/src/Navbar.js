import React from 'react'
import './styles/Navbar.css';
import {notes} from './assets'

import {NotesPage} from './pages'

import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';

export default function Navbar() {
     const [showNotes, setShowNotes] = useState(false);
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
               </div>

               <div className="notesBox">
                    <img src={notes} alt='notes' onClick={() => setShowNotes(!showNotes)}/>
               </div>

               <div className="signoutBox">
                    <div className="signoutButton" onClick={() => signOut()}>sign out</div>
               </div>
          </div>

          {showNotes && <NotesPage state={showNotes} setState={setShowNotes}/>}
     </nav>)
}