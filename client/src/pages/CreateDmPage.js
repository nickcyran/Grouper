import { useState, useEffect } from 'react';
import Select from 'react-select';
import { GetFriends} from '../controllers';
import axios from 'axios';

import '../styles/form.css'

const CreateDmPage = ({ set, toggleRender}) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([])
    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        var members = [localStorage.getItem('userID')]
        members = members.concat(selectedFriends.map(friend => friend.value));

        axios.post('http://localhost:9000/createDirectMessage/', {title: title, members: members })
        .then(res => {
            toggleRender()
            set(false)
        })
        .catch((err) => {
            console.error('Error in creating DM:', err);
        });
    }

    const userOptions = friends.map((user) => {
        return { label: user.username, value: user._id }
    })

    useEffect(() => {
        const fetchData = async () => {
            setFriends(await GetFriends(localStorage.getItem('userID')));
        };

        fetchData();
    }, []);

    return (
        <form className="fform" onSubmit={(e) => handleSubmit(e)}>
            <div className="innerForm">
                <div className="x" onClick={() => set(false)}>
                    x
                </div>
                <h2>Create new Direct Message</h2>

                
                <div>
                    <div className="formtitle">Title:</div>
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div>
                    <div className="formtitle">Add friends:</div>
                    <Select
                        className="selectForm"
                        isMulti
                        value={selectedFriends}
                        onChange={setSelectedFriends}
                        options={userOptions}
                        required
                    />
                </div>

                <button className="submit shadow" type="submit">
                    Send
                </button>
            </div>
        </form>
    );
};

export default CreateDmPage;