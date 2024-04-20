import './styles/App.css';
import { Main, ViewCalendar } from './pages'
import Login from './pages/Login.js';
import SignUp from './pages/Signup.js';
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
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
