import { messages_icon } from '../assets'
import { Friends, Group } from '.'
import { useState } from 'react';

const GroupIcon = ({ onClick }) => {
    return (
        <div className="square" onClick={onClick} />
    )
}

const Main = () => {
    const [group, setGroup] = useState(localStorage.getItem('currentGroup'));
    const [onFriendsPage, setOnFriendsPage] = useState(true);

    function updateLocalStorage(updatedData) {
        if (group !== updatedData) {
            localStorage.setItem('currentGroup', updatedData);
            setGroup(updatedData);
        }
    };

    return (
            <div className="main">
                <div className="navBar">
                    <div className="dmDir" onClick={() => {
                        updateLocalStorage('6620518cd5a9031a80a56964')
                        setOnFriendsPage(true)
                    }}>
                        <img src={messages_icon} alt="direct messages" />
                    </div>

                    <div className="groupBar">
                        {/* {[...Array(8)].map((x, i) =>
                        <GroupIcon />
                    )} */}
                        <GroupIcon onClick={() => {
                            setOnFriendsPage(false);
                            updateLocalStorage('66205239d5a9031a80a56968')
                        }} />
                        <GroupIcon onClick={() => {
                            setOnFriendsPage(false);
                            updateLocalStorage(null)
                        }} />
                        <GroupIcon />
                        {/*ITTERATE THRU EACH GROUP A PERSON BELONGS TO */}
                    </div>
                </div>

                {onFriendsPage ? <Friends group={group} /> : <Group group={group} />}
            </div>
    );
}

export default Main;