import { useState, useEffect } from 'react';
import Select from 'react-select';
import { GetFriends} from '../controllers';
import axios from 'axios';


const CreateDmPage = ({ set, toggleRender }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        var members = []
        members.push(localStorage.getItem('userID'))

        for (var i in selectedFriends) {
            members.push(selectedFriends[i].value)
        }

        axios.post('http://localhost:9000/createDirectMessage/', { members: members })
            .then((res) => {
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
                <h2>Create new Direct Message</h2>

                <Select
                    className="selectForm"
                    isMulti
                    value={selectedFriends}
                    onChange={setSelectedFriends}
                    options={userOptions}
                    required
                />

                <button className="submit" type="submit">Send</button>
            </div>
        </form>
    )
}

export default CreateDmPage;