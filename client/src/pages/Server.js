import { PageContent, Messaging } from '.'
import { useState, useEffect } from 'react';
import { GetTextChannels } from '../controllers'

import '../styles/group.css'

const Group_Right = () => {
    return (
        <>
            Members(in server)
        </>
    )
}

const Server = ({ server }) => {
    const [currentChannel, setCurrentChannel] = useState('');

    const Group_Left = () => {
        const [channels, setChannels] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                setChannels(await GetTextChannels({ sID: server }))
            };

            fetchData();
        }, [])

        return (
            <>
                channels
                <div className="group_left">
                    {channels.map((channel, index) => (
                        <div className="channelName" key={index} onClick={() => { setCurrentChannel(channel.channelChat) }}>
                            {channel.channelName}
                        </div>
                    ))}
                </div>
            </>
        )
    }

    const Group_Main = () => {
        return (
            <>
                <Messaging group={currentChannel} />
            </>
        )
    }

    return <PageContent Left={Group_Left} Main={Group_Main} Right={Group_Right} />
}

export default Server;