import axios from "axios";
import Select from 'react-select'
import { React, useState} from "react";

function ViewCalendar() {
     const [viewSetting, setViewSetting] = useState('Monthly')
     const viewArray = ['Daily', 'Weekly', 'Monthly', 'Yearly']
     const selection = '';

     const viewOptions = viewArray.map((prior) => {
          return { label: prior, value: prior }
     })

     // reset view setting
     const setView = (event) => {
          setViewSetting = event.data
          localStorage.clear()
          localStorage.setItem('viewSelection', viewSetting)
          selection = localStorage.getItem('viewSetting')
     }

     return (
          <div>
               <label>View Setting</label>
               <Select
                    value={viewSetting}
                    onChange={setView}
                    options={viewOptions}
               />

               <p></p>
               {selection === 'Daily' &&
                    <p>You are now viewing daily.</p>}

               {selection === 'Weekly' &&
                    <p>You are now viewing weekly.</p>}

               {selection === 'Monthly' &&
                    <p>You are now viewing monthly.</p>}

               {selection === 'Yearly' &&
                    <p>You are now viewing yearly.</p>}


          </div>
     )
}

export default ViewCalendar;