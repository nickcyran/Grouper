import React from 'react';
import '../styles/addFriend.css';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

import { AddFriend } from '../controllers';

const AddFriendPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
            .then((res) => setUsers(res.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Convert users to options for react-select
    const userOptions = users.map(user => ({
        label: `${user.username}`,
        value: user._id
    }));

    // Function to handle user selection
    const handleUserSelect = (selectedOption) => {
        setSelectedUser(selectedOption);
    }

    const handleSubmit = () => {
        if (selectedUser) {
            AddFriend({user_id: localStorage.getItem('userID'), friend_id: selectedUser.value})
            console.log("Selected User:", selectedUser.value);
            navigate('/')

        } else {
            console.log("No user selected.");
        }
    };


    return (
        <div className="addFriendPage">
            <Select
                className="select"
                options={userOptions}
                onChange={handleUserSelect}
                value={selectedUser}
                isClearable
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddFriendPage;