import { useState } from "react";
import { Link } from 'react-router-dom'
import {UpdateUserCal} from "../controllers/calendars.js";
import '../styles/newCal.css'

function NewCalendar({set}) {
     const [name, setName] = useState("")
     const [desc, setDesc] = useState("")
     const [users, setUsers] = useState([])
     const userID = localStorage.getItem('userID');
     
     const handleSubmit = (event) => {
          try {
               event.preventDefault()
               UpdateUserCal(userID, name)
               alert(name + ' successfully made')
          }
          catch (error) {
               console.log(error)
          }
     }

     return (
          <div className="CalendarForm">
                <div className="somex" onClick={() => set(false)}>
                    x
                </div>
                
               <div className="Calendertitle">New Calendar</div>
               {userID != null && 
                    <form>
                    <label>Calendar Name<br />
                         <input type="text" onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>Description<br />
                         <input type="text" onChange={(e) => setDesc(e.target.value)} />
                    </label>
                    <button onClick={(event) => handleSubmit(event)
                    }>Submit</button>
               </form>
               }

               {userID == null && 
                    <p>Please <Link to="/login">login</Link> to add a Calendar.</p>
               }


               
          </div>
     )
 }
export default NewCalendar;