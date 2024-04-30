import { PageContent, Messaging } from '.'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetTextChannels } from '../controllers'
import axios from 'axios';

import '../styles/group.css'

//so sorry to go from how nice  groups was to this but.......
const Server = ({ server }) => {
//GETTING SERVER INFO ---------------------------------------------------VARS

//Changing server stuff
const [currentChannel, setCurrentChannel] = useState('')

//GETTING SERVER INFO --------------------------------------------CALL USE EFFECT
    //CHANNELS -------------------------------------------------------------------------------------RIGHT
    const Server_Left = () => {
        const [userStatus, setUserStatus] = useState('') //whether user is an admin
        const [channels, setChannels] = useState([]) //channels in server
        const [thisServer, setThisServer] = useState('')

        useEffect(() => {
            //get whether or not current user is an admin --USE THIS TO DETERMINE WHETHER OR NOT A LIL GEAR BOX APPEARS THAT LEADS TO SERVER ADMIN PAGE
            axios.get('http://localhost:9000/getServerAdminStatus', { params: { sID: server, admin: localStorage.getItem('userID') } })
                .then(result => {
                    setUserStatus(result.data)}) //"admin" or "not_admin"
                .catch(err => console.log(err))

            //get reference to current server
            axios.get('http://localhost:9000/getCurrentServer', {params: { sID: server}})
                .then(result => {
                    setThisServer(result.data)})
                .catch(err => console.log(err))


            axios.get('http://localhost:9000/getServerChannels', {params: {sID: server}})
                .then(result => {
                    if(!((result.data === null || result.data === "" || result.data === "No channels in server.")))
                        setChannels(result.data)})
                //.catch(err => console.log(err))
        }, [])

        return (
            <>
                <h3>{thisServer.serverName}</h3>

                {userStatus === "admin" && (
                    <Link to={`/Server/${server}`}> Edit server </Link>
                )}

                <p></p>
                Channels:
                {channels.length > 0 && ( 
                <div className="group_left">
                    {channels.map((channel, index) => (
                        <div className="channelName" key={index} onClick={() => { setCurrentChannel(channel.channelName) }}>
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

    //MESSAGING --------------------------------------------------------------------------MID
    const Server_Main = () => {
        return (
            <>
                
            </>
        )
    }

    //MEMBERS IN SERVER ----------------------------------------------------------------RIGHT
    const Server_Right = () => {
        const [members, setMembers] = useState('') //refs to members in server
        
        useEffect(() => {
            axios.get('http://localhost:9000/getServerMembers', {params: {sID: server}})
                .then(result => {
                    setMembers(result.data)})
                .catch(err => console.log(err))
        }, [])

        return (
            <>
                <p> Members </p>
                {(members.length > 0 ) && (  
                    <div>
                    {members.map((member) => {
                    return <p> {member.username} </p>
                    })}
                    </div>
                    )}
            </>
        )
    }

    return <PageContent Left={Server_Left} Main={Server_Main} Right={Server_Right} />
}

export default Server;