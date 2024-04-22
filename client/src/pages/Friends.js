import { PageContent, Messaging } from '.'
import { useState } from 'react';

const Friend_Left = () => {
    return (
        <>
            Friends

            <div>
                
            </div>
        </>
    )
}

const Friend_Right = () => {
    return (
        <>
            User Profile
        </>
    )
}

const Friends = ({ group }) => {
    const[chatroom, setChatroom] = useState();

    const Friend_Main = () => {
        return (
            <>
            {chatroom ? <Messaging group={group} /> : <div>Friends</div>}
                
            </>
        )
    }


    return <PageContent Left={Friend_Left} Main={Friend_Main} Right={Friend_Right} group={group} />
}

export default Friends;
