import '../styles/Calendar.css';

function CalendarGrid() {
     const loggedInUser = localStorage.getItem('loggedInUser');
     return (
          <div>
               {loggedInUser == null &&
                         <p>Please login.</p>}

               {loggedInUser != null &&
                <p> {"Welcome " + loggedInUser + "!"}</p>
            }
          </div>
     )

}

export default CalendarGrid;