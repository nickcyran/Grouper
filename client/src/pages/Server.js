import { PageContent, Messaging } from '.'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetTextChannels } from '../controllers'
import axios from 'axios';

import '../styles/group.css'

//MESSAGING --------------------------------------------------------------------------MID
const Server_Main = ({ currentChannel, userStatus }) => {
    return (
        <>
            {currentChannel && <Messaging group={currentChannel.chatroom_id} isAdmin={userStatus === 'admin'} />}
        </>
    )
}

//so sorry to go from how nice  groups was to this but.......
const Server = ({ server }) => {
    //GETTING SERVER INFO ---------------------------------------------------VARS

    useEffect(() => {
        setCurrentChannel('')
    }, [server])

    //Changing server stuff
    const [userStatus, setUserStatus] = useState('')    //whether user is an admin
    const [currentChannel, setCurrentChannel] = useState('')
    //GETTING SERVER INFO --------------------------------------------CALL USE EFFECT
    //CHANNELS -------------------------------------------------------------------------------------RIGHT
    const Server_Left = () => {
        const [channels, setChannels] = useState([])        //channels in server
        const [thisServer, setThisServer] = useState('')

        useEffect(() => {
            //get whether or not current user is an admin --USE THIS TO DETERMINE WHETHER OR NOT A LIL GEAR BOX APPEARS THAT LEADS TO SERVER ADMIN PAGE
            axios.get('http://localhost:9000/getServerAdminStatus', { params: { sID: server, admin: localStorage.getItem('userID') } })
                .then(result => {
                    setUserStatus(result.data)
                }) //"admin" or "not_admin"
                .catch(err => console.log(err))

            //get reference to current server
            axios.get('http://localhost:9000/getCurrentServer', { params: { sID: server } })
                .then(result => {
                    setThisServer(result.data)
                })
                .catch(err => console.log(err))


            axios.get('http://localhost:9000/getServerChannels', { params: { sID: server } })
                .then(result => {
                    if (!((result.data === null || result.data === "" || result.data === "No channels in server.")))
                        setChannels(result.data)
                })
            //.catch(err => console.log(err))
        }, [])

        return (
            <>
                <div className="l_bar_head shadow serverName">
                    {thisServer.serverName}
                </div>
                
                {userStatus === "admin" && (
                    <Link to={`/Server/${server}`}> Edit server </Link>
                )}

                <p></p>
                Channels:
                {channels.length > 0 && (
                    <div className="group_left">
                        {channels.map((channel, index) => (
                            <div className="channelName" key={index} onClick={() => { setCurrentChannel(channel) }}>
                                {channel.channelName}
                            </div>
                        ))}
                    </div>
                )}
                {channels.length === 0 && (
                    <p>No channels in server.</p>
                )}
            </>
        )
    }


    //MEMBERS IN SERVER ----------------------------------------------------------------RIGHT
    const Server_Right = () => {
        const [members, setMembers] = useState([]) //refs to members in server

        useEffect(() => {
            axios.get('http://localhost:9000/getServerMembers', { params: { sID: server } })
                .then(result => {
                    setMembers(result.data)
                })
                .catch(err => console.log(err))
        }, [])

        return (
            <>
                <div className="title shadow" style={{ backgroundColor: "#1b2439" }}>
                    Members
                </div>

                <div className="scroll profilebar">
                    {members.map((member, index) => (
                        <div key={index} className="memberBox">
                            <div className="memberpfp">
                                <img className="pfpInnards" src={'http://localhost:9000/Images/' + member.profile.profile_pic} alt='pfp' />
                            </div>

                            <div className="memberName">{member.username} </div>

                        </div>
                    ))}
                </div>
            </>
        )
    }

    return <PageContent Left={Server_Left} Main={() => (<Server_Main currentChannel={currentChannel} userStatus={userStatus} />)} Right={Server_Right} />
}

export default Server;