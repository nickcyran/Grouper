import '../styles/notes.css'
import {useState, useEffect} from 'react'
import axios from 'axios';

const NotesPage = ({ state, setState }) => {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9000/getNotes/', { params: { id: localStorage.getItem('userID')} })
            .then((res) => {
                setNotes(res.data);
            })
    }, []);
    
    const handleSave = () => {
        axios.post('http://localhost:9000/setNotes/', { id: localStorage.getItem('userID'), notes })
    }

    return (
        <div className="NotesBG">
            <div className="NotesX" onClick={() => setState(false)}>
                x
            </div>

        
            <textarea
                className="NotesTextArea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
            />
            <button className="SaveButton" onClick={handleSave}>Save</button>
        </div>
    )
}

export default NotesPage;