import './styles/App.css';
import { Messaging, Main, ViewCalendar } from './pages'
import {Routes, Route} from "react-router-dom"
import Navbar from './Navbar.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/viewcalendar" element={<ViewCalendar />} />
      </Routes>

    </div>
  );
}

export default App;
