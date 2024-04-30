import React from 'react'
import './styles/Navbar.css';
import { notes, calendar } from './assets'

import { NotesPage, ViewCalendar} from './pages'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
     const [showNotes, setShowNotes] = useState(false);
     const [showCal, setShowCal] = useState(false);

     const navigate = useNavigate();

     const signOut = () => {
          localStorage.clear();
          navigate("/Login");
     }

     return (<nav className="nav" id="navbar">
          <div className="wrap">
               <div className="links">
                    <Link to="/">Messaging</Link>&nbsp;
               </div>

               <div className="notesBox">
                    <img src={calendar} alt='calendar' onClick={() => setShowCal(!showNotes)} />
               </div>

               <div className="notesBox">
                    <img src={notes} alt='notes' onClick={() => setShowNotes(!showNotes)} />
               </div>

               <div className="signoutBox">
                    <div className="signoutButton" onClick={() => signOut()}>sign out</div>
               </div>
          </div>
          
          {showCal && <ViewCalendar state={showCal} set={setShowCal}/>}
          {showNotes && <NotesPage state={showNotes} setState={setShowNotes} />}
     </nav>)
}