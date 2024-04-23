import './styles/App.css';
import { Main, ViewCalendar, Events, Login, Signup, NewCalendar} from './pages'
import ProfileSettings from './pages/ProfileSettings.js';
import ServerHome from './pages/ServerHome'
import ServerPage from './pages/ServerPage'
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
        <Route path="/serverhome" element={<ServerHome/>} />
        <Route path="/server/:id" element={<ServerPage/>} />
        <Route path="/createCalendar" element={<NewCalendar/>} />
        <Route path="/profileSettings" element={<ProfileSettings/>} />
      </Routes>
    </div>
  );
}

export default App;
