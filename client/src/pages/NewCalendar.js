import { useState } from "react";
import { Link } from 'react-router-dom'
import {UpdateUserCal} from "../controllers/calendars.js";

function NewCalendar() {
     const [name, setName] = useState("")
     const [desc, setDesc] = useState("")
     const [users, setUsers] = useState([])
     const loggedInUser = localStorage.getItem('loggedInUser');
     
     const handleSubmit = (event) => {
          try {
               event.preventDefault()
               UpdateUserCal(loggedInUser, name, desc)
          }
          catch (error) {
               console.log(error)
          }
     }

     return (
          <div>
               {loggedInUser != null && 
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

               {loggedInUser == null && 
                    <p>Please <Link to="/login">login</Link> to add a Calendar.</p>
               }


               
          </div>
     )
 }
export default NewCalendar;