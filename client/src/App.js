import './styles/App.css';
import { Main, ViewCalendar, Events, Login, Signup } from './pages'
import {Routes, Route} from "react-router-dom"
import Navbar from './Navbar.js'

function App() {
  return (
    <div className="App">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/viewcalendar" element={<ViewCalendar />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
