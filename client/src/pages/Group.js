import { PageContent, Messaging } from '.'
import { useState, useEffect } from 'react';
import axios from 'axios';

// okay i kinda made this confusing so uhhh,,,,,,, uhhh,,,, ;-;

const Group_Main = ({ group }) => {
    return (
        <>
            <Messaging group={group} />
        </>
    )
}

const Group_Right = () => {
    return (
        <>
            Members
        </>
    )
}

const Group = ({ group }) => {
    const[currentChannel, setCurrentChannel] = useState('');

    const Group_Left = () => {
        const[channels, setChannels] = useState([]);
       

        useEffect(() => {
            axios.get('http://localhost:9000/getTextChannels/', { params: { id: group } })
                .then(res => {
                    setChannels(res.data);
                    setCurrentChannel(res.data[0].channelChat)          //default to general
                })
                .catch((err) => {
                    console.error('Error in getting textChannels:', err);
                });
        }, [])

        return (
            <>
                channels
                {channels.map((channel) => (
                        <div className="" key={channel._id} onClick={() => {
                            setCurrentChannel(channel.channelChat);
                        }}>
                            {channel.channelName}
                        </div>
                    ))}
            </>
        )
    }

    return <PageContent Left={Group_Left} Main={Group_Main} Right={Group_Right} group={currentChannel} />
}

export default Group;