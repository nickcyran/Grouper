import { messages_icon } from '../assets'
import { Friends } from '.'
import { useState } from 'react';
import axios from 'axios';

const GroupIcon = ({ onClick }) => {
    return (
        <div className="square"  onClick={onClick}/>
    )
}

const Main = () => {
    const [group, setGroup] = useState(localStorage.getItem('currentGroup'));

    function updateLocalStorage(updatedData){
        if(group != updatedData){
            localStorage.setItem('currentGroup', updatedData);
            setGroup(updatedData);
        }
    };
    
    return (
        <div className="main">
            <div className="navBar">
                <div className="dmDir">
                    <img src={messages_icon} alt="direct messages" />
                </div>

                <div className="groupBar">
                    {/* {[...Array(8)].map((x, i) =>
                        <GroupIcon />
                    )} */}
                    <GroupIcon onClick={() => {updateLocalStorage('6620518cd5a9031a80a56964')}}/>
                    <GroupIcon onClick={() => {updateLocalStorage('66205239d5a9031a80a56968')}}/>
                    <GroupIcon />
                    {/*ITTERATE THRU EACH GROUP A PERSON BELONGS TO */}
                </div>
            </div>

            <Friends group={group}/>
            {/*PAGE CONTENT:: FRIENDS OR GROUP */}
        </div>
    );
}

export default Main;